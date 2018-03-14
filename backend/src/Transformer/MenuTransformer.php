<?php
namespace JNL\Transformer;

use JNL\Core\Transformer;
use JNL\Entity\Menu;
use League\Fractal\ParamBag;
use League\Fractal\Resource\ResourceInterface;

class MenuTransformer extends Transformer
{
    protected $defaultIncludes = [
        'items'
    ];

    private $validParams = [
        'drafts'
    ];

    public function transform(Menu $menu): array
    {
        return [
            'id' => $menu->id,
            'name' => $menu->name
        ];
    }

    public function includeItems(Menu $menu, ?ParamBag $params): ResourceInterface
    {
        error_log($params['drafts']);

        return $this->createCollection(
            $this->filter($menu->items, [
                'hidden' => function ($value, $authenticated) {
                    return !$value || $authenticated;
                },
                'draft' => function ($value, $authenticated) use ($params) {
                    return !$value || (!$authenticated && $params['drafts']);
                }
            ]),
            MenuItemTransformer::class
        );
    }
}
