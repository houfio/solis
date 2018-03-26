<?php
namespace JNL\Transformers\ContentBlock;

use JNL\Core\Transformer;
use JNL\Entities\BlockData\Text;

class TextBlockTransformer extends Transformer
{
    public function transform(Text $data): array
    {
        return [
            'id' => $data->id,
            'text' => $data->text
        ];
    }
}
