<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="menu_items")
 * @ORM\Entity
 */
class MenuItem implements JsonSerializable
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
     * @ORM\Column(type="integer")
     */
    public $target;

    /**
     * @ORM\OneToMany(targetEntity="MenuColumn", mappedBy="item")
     */
    public $columns;

    public function jsonSerialize(): array
    {
        return [
            'target' => $this->target,
            'columns' => $this->columns
        ];
    }
}
