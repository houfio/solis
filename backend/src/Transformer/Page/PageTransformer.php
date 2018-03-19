<?php
namespace JNL\Transformer\Page;

use JNL\Core\Transformer;
use JNL\Entity\Page;
use League\Fractal\Resource\ResourceInterface;

class PageTransformer extends Transformer
{
    protected $defaultIncludes = [
        'guards'
    ];

    public function transform(Page $page): array
    {
        return [
            'id' => $page->id,
            'name' => $page->name,
            'path' => $page->path,
            'type' => $page->type,
            'hidden' => $page->hidden,
            'draft' => $page->draft
        ];
    }

    public function includeGuards(Page $page): ResourceInterface
    {
        return $this->null();
    }
}
