<?php
namespace Solis\Transformers\Menu;

use Solis\Core\Transformer;
use Solis\Entities\MenuTarget;

class MenuTargetTransformer extends Transformer
{
    public function transform(MenuTarget $target): array
    {
        return [
            'id' => $target->id,
            'target' => $target->target,
            'order' => $target->order
        ];
    }
}
