<?php
namespace JNL\Transformers\User;

use JNL\Core\Transformer;
use JNL\Entities\BlogPost;
use JNL\Entities\Token;
use JNL\Entities\User;
use League\Fractal\Resource\ResourceInterface;

class BlogTransformer extends Transformer
{
    public function transform(BlogPost $blogPost): array
    {
        return [
            'id' => $blogPost->id,
            'title' => $blogPost->title,
            'date' => $blogPost->date
        ];
    }
}