<?php
namespace JNL\Transformer\Menu;

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
        return $this->createCollection($column->targets, MenuTargetTransformer::class);
    }
}
