<?php
namespace JNL\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="menu_items")
 * @ORM\Entity
 */
class MenuItem
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Menu", inversedBy="items")
     */
    public $menu;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $name;

    /**
     * @ORM\Column(type="boolean")
     */
    public $hidden = false;

    /**
     * @ORM\OneToMany(targetEntity="MenuColumn", mappedBy="item")
     */
    public $columns;

    public function __construct()
    {
        $this->columns = new ArrayCollection();
    }
}
