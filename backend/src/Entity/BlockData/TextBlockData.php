<?php
namespace JNL\Entity\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="text_blocks")
 * @ORM\Entity
 */
class TextBlockData extends AbstractBlockData
{
    /**
     * @ORM\Column(type="text")
     */
    public $text;

    public function jsonSerialize(): array
    {
        return [
            'text' => $this->text
        ];
    }
}
