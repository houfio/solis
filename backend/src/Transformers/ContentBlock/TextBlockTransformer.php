<?php
namespace Solis\Transformers\ContentBlock;

use Solis\Core\Transformer;
use Solis\Entities\BlockData\Text;

class TextBlockTransformer extends Transformer
{
    public function transform(Text $data): array
    {
        return [
            'text' => $data->text,
            'mode' => $data->mode
        ];
    }
}
