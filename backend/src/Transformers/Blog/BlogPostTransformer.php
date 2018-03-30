<?php
namespace Solis\Transformers\Blog;

use Solis\Core\Transformer;
use Solis\Entities\BlogPost;
use Solis\Entities\Token;
use Solis\Entities\User;
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
