<?php
namespace Solis\Transformers\Page;

use Solis\Core\Transformer;
use Solis\Entities\PageGuard;

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
