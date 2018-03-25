<?php
namespace JNL\Transformers\Menu;

use JNL\Core\Transformer;
use JNL\Entities\MenuItem;
use League\Fractal\Resource\ResourceInterface;

class MenuItemTransformer extends Transformer
{
    protected $defaultIncludes = [
        'columns'
    ];

    public function transform(MenuItem $item): array
    {
        return [
            'id' => $item->id,
            'name' => $item->name,
            'order' => $item->order,
            'hidden' => $item->hidden
        ];
    }

    public function includeColumns(MenuItem $item): ResourceInterface
    {
        return $this->createCollection($item->columns, MenuColumnTransformer::class);
    }
}
