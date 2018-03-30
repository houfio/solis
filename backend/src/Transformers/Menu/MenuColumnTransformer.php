<?php
namespace Solis\Transformers\Menu;

use Solis\Core\Transformer;
use Solis\Entities\MenuColumn;
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
            'name' => $column->name,
            'order' => $column->order
        ];
    }

    public function includeTargets(MenuColumn $column): ResourceInterface
    {
        return $this->createCollection($column->targets, MenuTargetTransformer::class);
    }
}
