<?php
namespace Solis\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="menu_columns")
 * @ORM\Entity
 */
class MenuColumn
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="MenuItem", inversedBy="columns")
     */
    public $item;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $name;

    /**
     * @ORM\Column(type="integer")
     */
    public $order;

    /**
     * @ORM\OneToMany(targetEntity="MenuTarget", mappedBy="column")
     */
    public $targets;

    public function __construct()
    {
        $this->targets = new ArrayCollection();
    }
}
