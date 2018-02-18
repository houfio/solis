<?php
namespace JNL\Core;

use JsonSerializable;
use League\Route\Http\Exception\NotFoundException;

class RouteSet implements JsonSerializable
{
    private $routes = [];

    public static function create(): RouteSet
    {
        return new RouteSet();
    }

    public function get(string $name, string $path, string $handler, bool $auth = false, array $args = []): RouteSet
    {
        return $this->withRoute($name, $path, 'GET', $handler, $auth, $args);
    }

    public function post(string $name, string $path, string $handler, bool $auth = false, array $args = []): RouteSet
    {
        return $this->withRoute($name, $path, 'POST', $handler, $auth, $args);
    }

    public function withRoute(string $name, string $path, string $method, string $handler, bool $auth, array $args): RouteSet
    {
        return $this->withRawRoute([
            'name' => $name,
            'path' => $path,
            'method' => $method,
            'handler' => $handler,
            'auth' => $auth,
            'args' => $args
        ]);
    }

    public function withRawRoute(array $route): RouteSet
    {
        $new = clone $this;
        $new->routes[] = $route;

        return $new;
    }

    public function getRoutes(): array
    {
        return $this->routes;
    }

    public function getRouteForPath(string $path): array
    {
        foreach ($this->routes as $route) {
            if ($route['path'] === $path) {
                return $route;
            }
        }

        throw new NotFoundException();
    }

    public function jsonSerialize(): array
    {
        return array_reduce(
            $this->getRoutes(),
            function ($result, $route) {
                $args = [];

                foreach ($route['args'] as $name => $rules) {
                    $rls = [];

                    foreach ($rules as $rule => $params) {
                        if (is_int($rule)) {
                            $rule = $params;
                            $params = [];
                        }

                        $rls[$rule] = $params;
                    }

                    $args[$name] = $rls;
                }

                $result[$route['name']] = [
                    'path' => $route['path'],
                    'method' => $route['method'],
                    'auth' => $route['auth'],
                    'args' => $args
                ];

                return $result;
            },
            []
        );
    }
}
