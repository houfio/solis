<?php
namespace JNL\Transformers\ContentBlock;

use JNL\Core\Transformer;
use JNL\Entities\BlockData\Hero;

class HeroBlockTransformer extends Transformer
{
    public function transform(Hero $data): array
    {
        return [
            'image' => $data->image,
            'alignment' => $data->alignment,
            'height' => $data->height
        ];
    }
}
