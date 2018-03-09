<?php
namespace JNL\Entity\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="button_blocks")
 * @ORM\Entity
 */
class ButtonBlockData extends AbstractBlockData
{
    /**
     * @ORM\Column(type="string", length=128)
     */
    public $text;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $type;

    /**
     * @ORM\Column(type="integer")
     */
    public $target;

    public function jsonSerialize(): array
    {
        return [
            'text' => $this->text,
            'type' => $this->type,
            'target' => $this->type
        ];
    }
}
