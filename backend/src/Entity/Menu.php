<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="menus")
 * @ORM\Entity
 */
class Menu
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $name;

    /**
     * @ORM\OneToMany(targetEntity="MenuItem", mappedBy="menu")
     */
    public $items;
}
