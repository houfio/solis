<?php
namespace JNL\Transformers\ContentBlock;

use JNL\Core\Transformer;
use JNL\Entities\BlockData\Button;
use JNL\Entities\BlockData\Column;

class ColumnBlockTransformer extends Transformer
{
    public function transform(Column $data): array
    {
        return [
            'id' => $data->id,
            'size' => $data->size,
            'breakpoint' => $data->breakpoint
        ];
    }
}
