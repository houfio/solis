<?php
namespace JNL\Entity;

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
     * @ORM\ManyToOne(targetEntity="MenuItem")
     */
    public $item;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $name;

    /**
     * @ORM\OneToMany(targetEntity="MenuTarget", mappedBy="column")
     */
    public $targets;
}
