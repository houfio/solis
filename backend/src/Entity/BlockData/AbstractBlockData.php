<?php
namespace JNL\Entity\BlockData;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\MappedSuperclass
 */
abstract class AbstractBlockData implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="JNL\Entity\ContentBlock", inversedBy="data")
     */
    public $block;
}
