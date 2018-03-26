<?php
namespace JNL\Transformers\Page;

use JNL\Core\Transformer;
use JNL\Entities\Page;
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
            'hidden' => $page->hidden
        ];
    }

    public function includeGuards(Page $page): ResourceInterface
    {
        return $this->createCollection($page->guards, PageGuardTransformer::class);
    }
}
