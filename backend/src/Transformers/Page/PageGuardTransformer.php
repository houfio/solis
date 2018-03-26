<?php
namespace JNL\Transformers\Page;

use JNL\Core\Transformer;
use JNL\Entities\PageGuard;

class PageGuardTransformer extends Transformer
{
    public function transform(PageGuard $guard): array
    {
        return [
            'id' => $guard->id,
            'type' => $guard->type,
            'target' =>  $guard->target
        ];
    }
}
