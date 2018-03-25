<?php
namespace JNL\Transformers\ContentBlock;

use JNL\Core\Transformer;
use JNL\Entities\ContentBlock;
use League\Fractal\Resource\ResourceInterface;

class ContentBlockTransformer extends Transformer
{
    protected $defaultIncludes = [
        'children',
        'data'
    ];

    private $dataTransformers = [
        'text' => TextBlockTransformer::class
    ];

    public function transform(ContentBlock $block): array
    {
        return [
            'id' => $block->id,
            'page_id' => $block->page->id,
            'parent' => $block->parent ? [
                'id' => $block->parent->id,
                'data' => $block->parent_data
            ] : null,
            'type' => $this->getType($block),
            'hidden' => $block->hidden
        ];
    }

    public function includeChildren(ContentBlock $block): ResourceInterface
    {
        return $this->createCollection($block->children, ContentBlockTransformer::class);
    }

    public function includeData(ContentBlock $block): ResourceInterface
    {
        return $this->createItem($block->data, $this->dataTransformers[$this->getType($block)]);
    }

    private function getType(ContentBlock $block)
    {
        $metadataFactory = $this->getEntityManager()->getMetadataFactory();
        $meta = $metadataFactory->getMetadataFor(get_class($block->data));

        return $meta->discriminatorValue;
    }
}
