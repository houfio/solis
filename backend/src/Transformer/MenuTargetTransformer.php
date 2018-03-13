<?php
namespace JNL\Transformer;

use JNL\Core\Transformer;
use JNL\Entity\MenuTarget;

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
