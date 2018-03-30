<?php
namespace Solis\Transformers\ContentBlock;

use Solis\Core\Transformer;
use Solis\Entities\BlockData\Hero;

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
