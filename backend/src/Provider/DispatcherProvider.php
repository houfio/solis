<?php
namespace JNL\Provider;

use JNL\Core\ArgumentStrategy;
use JNL\Core\Controller;
use JNL\Core\RouteSet;
use League\Container\ServiceProvider\AbstractServiceProvider;
use League\Route\RouteCollection;
use League\Route\RouteGroup;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\RedirectResponse;

class DispatcherProvider extends AbstractServiceProvider
{
    protected $provides = [
        'dispatcher',
        'routes'
    ];

    public function provides($alias = null)
    {
        return array_merge($this->provides, array_map(
            function ($controller) {
                return $controller . '\routeSet';
            },
            ControllerProvider::CONTROLLERS
        ));
    }

    public function register()
    {
        $config = $this->getContainer()->get('config');
        $dispatcher = new RouteCollection($this->getContainer());


        $dispatcher->setStrategy(new ArgumentStrategy($this->getContainer()));
        $dispatcher->middleware(function (ServerRequestInterface $request, ResponseInterface $response, callable $next) {
            $uri = $request->getUri();
            $path = $uri->getPath();

            if (substr($path, -1) === '/' && $path !== '/') {
                return new RedirectResponse(substr($path, 0, -1) . $uri->getQuery(), 301);
            }

            return $next($request, $response);
        });

        $dispatcher->group($config['prefix'], function(RouteGroup $group) {
            $routes = RouteSet::create();

            foreach (ControllerProvider::CONTROLLERS as $controller) {
                /** @var Controller $controller */
                $controller = $this->getContainer()->get($controller);
                $routeSet = $controller->initialize();

                $this->getContainer()->share(get_class($controller) . '\routeSet', function () use ($routeSet) {
                    return $routeSet;
                });

                foreach ($routeSet->getRoutes() as $route) {
                    $routes = $routes->withRawRoute($route);

                    $group->map($route['method'], $route['path'], [$controller, $route['handler']]);

                    if ($route['auth']) {
                        $group->options($route['path'], ['JNL\Controller\ApiController', 'optionsApi']);
                    }
                }
            }

            $this->getContainer()->share('routes', function () use ($routes) {
                return $routes;
            });
        });

        $this->getContainer()->share('dispatcher', function () use ($dispatcher) {
            return $dispatcher;
        });
    }
}
