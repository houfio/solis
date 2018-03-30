<?php
namespace Solis\Transformers\Menu;

use Solis\Core\Transformer;
use Solis\Entities\Menu;
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
