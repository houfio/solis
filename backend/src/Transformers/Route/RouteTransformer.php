<?php
namespace JNL\Transformers\Route;

use JNL\Core\Transformer;
use League\Fractal\Resource\ResourceInterface;

class RouteTransformer extends Transformer
{
    public $defaultIncludes = [
        'args'
    ];

    public function transform(array $route): array
    {
        return [
            'name' => $route['name'],
            'path' => $route['path'],
            'method' => $route['method'],
            'auth' => $route['auth']
        ];
    }

    public function includeArgs(array $route): ResourceInterface
    {
        $args = [];

        foreach ($route['args'] as $name => $rules) {
            $args[] = [
                'name' => $name,
                'rules' => $rules
            ];
        }

        return $this->createCollection($args, RouteArgumentTransformer::class);
    }
}
