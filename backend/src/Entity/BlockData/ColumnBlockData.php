<?php
namespace JNL\Entity\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="column_blocks")
 * @ORM\Entity
 */
class ColumnBlockData extends AbstractBlockData
{
    /**
     * @ORM\Column(type="integer")
     */
    public $size;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $breakpoint;

    public function jsonSerialize(): array
    {
        return [
            'size' => $this->size,
            'breakpoint' => $this->breakpoint
        ];
    }
}
