<?php
namespace JNL\Transformers\ContentBlock;

use JNL\Core\Transformer;
use JNL\Entities\BlockData\Hero;

class HeroBlockTransformer extends Transformer
{
    public function transform(Hero $data): array
    {
        return [
            'id' => $data->id,
            'image' => $data->image,
            'alignment' => $data->alignment,
            'fill' => $data->fill,
            'height' => $data->height,
            'dark' => $data->dark
        ];
    }
}
