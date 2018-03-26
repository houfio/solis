<?php
namespace JNL\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="menu_targets")
 * @ORM\Entity
 */
class MenuTarget
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="MenuColumn", inversedBy="targets")
     */
    public $column;

    /**
     * @ORM\Column(type="integer")
     */
    public $target;

    /**
     * @ORM\Column(type="integer")
     */
    public $order;
}
