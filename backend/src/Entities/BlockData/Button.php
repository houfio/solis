<?php
namespace JNL\Entities\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Button extends BlockData
{
    /**
     * @ORM\Column(type="string", length=128)
     */
    public $text;

    /**
     * @ORM\Column(type="integer")
     */
    public $type;

    /**
     * @ORM\Column(type="integer")
     */
    public $target;
}
