<?php
namespace JNL\Entity;

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
     * @ORM\ManyToOne(targetEntity="Menu")
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
     * @ORM\Column(type="boolean")
     */
    public $draft = true;

    /**
     * @ORM\OneToMany(targetEntity="MenuColumn", mappedBy="item")
     */
    public $columns;
}
