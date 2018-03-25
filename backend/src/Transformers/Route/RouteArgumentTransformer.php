<?php
namespace JNL\Transformers\Route;

use JNL\Core\Transformer;

class RouteArgumentTransformer extends Transformer
{
    public function transform(array $argument): array
    {
        $rules = [];

        foreach ($argument['rules'] as $rule => $params) {
            if (is_int($rule)) {
                $rules[] = [
                    'name' => $params,
                    'params' => []
                ];

                continue;
            }

            $rules[] = [
                'name' => $rule,
                'params' => $params
            ];
        }

        return [
            'name' => $argument['name'],
            'rules' => $rules
        ];
    }
}
