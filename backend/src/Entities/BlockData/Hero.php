<?php
namespace JNL\Entities\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Hero extends BlockData
{
    /**
     * @ORM\Column(type="string", length=512)
     */
    public $image;

    /**
     * @ORM\Column(type="integer")
     */
    public $alignment;

    /**
     * @ORM\Column(type="integer")
     */
    public $height;
}
