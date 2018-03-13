<?php
namespace JNL\Entity;

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
     * @ORM\ManyToOne(targetEntity="MenuColumn")
     */
    public $column;

    /**
     * @ORM\Column(type="integer")
     */
    public $target;
}
