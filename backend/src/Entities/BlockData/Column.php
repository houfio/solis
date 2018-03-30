<?php
namespace Solis\Entities\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Column extends BlockData
{
    /**
     * @ORM\Column(type="integer")
     */
    public $size;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $breakpoint;
}
