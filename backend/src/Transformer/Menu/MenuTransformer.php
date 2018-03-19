<?php
namespace JNL\Transformer\Menu;

use JNL\Core\Transformer;
use JNL\Entity\Menu;
use League\Fractal\ParamBag;
use League\Fractal\Resource\ResourceInterface;

class MenuTransformer extends Transformer
{
    protected $defaultIncludes = [
        'items'
    ];

    public function transform(Menu $menu): array
    {
        return [
            'id' => $menu->id,
            'name' => $menu->name
        ];
    }

    public function includeItems(Menu $menu): ResourceInterface
    {
        return $this->createCollection($menu->items, MenuItemTransformer::class);
    }
}
