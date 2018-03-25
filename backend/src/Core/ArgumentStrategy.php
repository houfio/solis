<?php
namespace JNL\Core;

use Exception;
use JNL\Exception\HttpArrayException;
use League\Fractal\Manager;
use League\Fractal\Resource\ResourceInterface;
use League\Route\Http\Exception\MethodNotAllowedException;
use League\Route\Http\Exception\NotFoundException;
use League\Route\Http\Exception as HttpException;
use League\Route\Route;
use League\Route\Strategy\StrategyInterface;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Valitron\Validator;
use Zend\Diactoros\Response\JsonResponse;

class ArgumentStrategy implements StrategyInterface
{
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getCallable(Route $route, array $vars)
    {
        return function (ServerRequestInterface $request, ResponseInterface $response, callable $next) use ($route, $vars) {
            $callable = $route->getCallable();
            $config = $this->container->get('config');
            /** @var RouteSet $routeSet */
            $routeSet = $this->container->get(get_class($callable[0]) . '\routeSet');
            /** @var Manager $transformer */
            $transformer = $this->container->get('transformer');
            $path = substr($route->getPath(), strlen($config['prefix']));

            if (empty($path)) {
                $path = '/';
            }

            $route = $routeSet->getRouteForPath($path);
            $args = array_intersect_key(json_decode(file_get_contents('php://input'), true) ?? [], $route['args']);
            $validator = new Validator($args);

            foreach ($route['args'] as $argument => $rules) {
                foreach ($rules as $rule => $params) {
                    if (is_int($rule)) {
                        $validator->rule($params, $argument);

                        continue;
                    }

                    $validator->rule($rule, $argument, ...$params);
                }
            }

            if (!$validator->validate()) {
                throw new HttpArrayException($validator->errors(), 422);
            }

            $response = call_user_func_array($callable, [$args, $vars, $request->getQueryParams()]);

            if (is_bool($response)) {
                $response = new JsonResponse(['success' => $response]);
            } else if ($response instanceof ResourceInterface) {
                $data = $transformer->createData($response)->toArray();

                $response = new JsonResponse(['success' => true, 'data' => $data]);
            } else if (!$response instanceof ResponseInterface) {
                $response = new JsonResponse(['success' => true, 'data' => $response]);
            }

            return $next($request, $response);
        };
    }

    public function getNotFoundDecorator(NotFoundException $exception)
    {
        return function () use ($exception) {
            return $this->buildJsonResponse($exception);
        };
    }

    public function getMethodNotAllowedDecorator(MethodNotAllowedException $exception)
    {
        return function () use ($exception) {
            return $this->buildJsonResponse($exception);
        };
    }

    public function getExceptionDecorator(Exception $exception)
    {
        return function () use ($exception) {
            if (!$exception instanceof HttpException) {
                $exception = new HttpException(500, $exception->getMessage());
            }

            return $this->buildJsonResponse($exception);
        };
    }

    private function buildJsonResponse(HttpException $exception)
    {
        $response = [
            'success' => false,
            'code' => $exception->getStatusCode(),
            'message' => $exception->getMessage()
        ];

        if ($exception instanceof HttpArrayException) {
            $response = array_merge($response, [
                'data' => $exception->getArray()
            ]);
        }

        $response = new JsonResponse($response);

        foreach ($exception->getHeaders() as $key => $value) {
            $response = $response->withAddedHeader($key, $value);
        }

        return $response;
    }
}
