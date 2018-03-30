<?php
namespace Solis\Transformers\ContentBlock;

use Solis\Core\Transformer;
use Solis\Entities\BlockData\Button;
use Solis\Entities\BlockData\Column;

class ColumnBlockTransformer extends Transformer
{
    public function transform(Column $data): array
    {
        return [
            'size' => $data->size,
            'breakpoint' => $data->breakpoint
        ];
    }
}
