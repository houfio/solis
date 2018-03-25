<?php
namespace JNL\Transformers\Menu;

use JNL\Core\Transformer;
use JNL\Entities\MenuTarget;

class MenuTargetTransformer extends Transformer
{
    public function transform(MenuTarget $target): array
    {
        return [
            'id' => $target->id,
            'target' => $target->target
        ];
    }
}
