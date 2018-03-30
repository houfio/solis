<?php
namespace Solis\Entities\BlockData;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="block_data")
 * @ORM\Entity
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="data_type", type="string")
 */
abstract class BlockData
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="Solis\Entities\ContentBlock", inversedBy="data")
     */
    public $block;
}
