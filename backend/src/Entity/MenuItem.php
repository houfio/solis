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

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'hidden' => $this->hidden,
            'draft' => $this->draft,
            'columns' => $this->columns
        ];
    }
}
