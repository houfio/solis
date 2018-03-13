<?php
namespace JNL\Transformer;

use JNL\Core\Transformer;
use JNL\Entity\MenuItem;
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
            'hidden' => $item->hidden,
            'draft' => $item->draft
        ];
    }

    public function includeColumns(MenuItem $item): ResourceInterface
    {
        return $this->collection($item->columns, MenuColumnTransformer::class);
    }
}
