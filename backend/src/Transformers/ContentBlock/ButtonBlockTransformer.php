<?php
namespace JNL\Transformers\ContentBlock;

use JNL\Core\Transformer;
use JNL\Entities\BlockData\Button;

class ButtonBlockTransformer extends Transformer
{
    public function transform(Button $data): array
    {
        return [
            'text' => $data->text,
            'type' => $data->type,
            'target' => $data->target
        ];
    }
}
