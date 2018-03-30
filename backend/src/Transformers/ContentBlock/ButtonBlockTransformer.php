<?php
namespace Solis\Transformers\ContentBlock;

use Solis\Core\Transformer;
use Solis\Entities\BlockData\Button;

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
