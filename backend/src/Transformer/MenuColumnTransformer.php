<?php
namespace JNL\Transformer;

use JNL\Core\Transformer;
use JNL\Entity\MenuColumn;
use League\Fractal\Resource\ResourceInterface;

class MenuColumnTransformer extends Transformer
{
    protected $defaultIncludes = [
        'targets'
    ];

    public function transform(MenuColumn $column): array
    {
        return [
            'id' => $column->id,
            'name' => $column->name
        ];
    }

    public function includeTargets(MenuColumn $column): ResourceInterface
    {
        return $this->collection($column->targets, MenuTargetTransformer::class);
    }
}
