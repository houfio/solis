<?php
namespace Solis\Entities\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Text extends BlockData
{
    /**
     * @ORM\Column(type="text")
     */
    public $text;

    /**
     * @ORM\Column(type="integer")
     */
    public $mode;
}
