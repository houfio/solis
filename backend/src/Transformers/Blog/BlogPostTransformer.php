<?php
namespace JNL\Transformers\Blog;

use JNL\Core\Transformer;
use JNL\Entities\BlogPost;
use JNL\Entities\Token;
use JNL\Entities\User;
use League\Fractal\Resource\ResourceInterface;

class BlogPostTransformer extends Transformer
{
    public $availableIncludes = [
        'content'
    ];

    public function transform(BlogPost $post): array
    {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'date' => $post->date->format('Y-m-d H:i')
        ];
    }

    public function includeContent(BlogPost $post): ResourceInterface
    {
        return $this->primitive($post->content);
    }
}
