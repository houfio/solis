<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="pages")
 * @ORM\Entity
 */
class Page implements JsonSerializable
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
     * @ORM\Column(type="string", length=128)
     */
    public $path;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    public $type;

    /**
     * @ORM\Column(type="boolean")
     */
    public $visible = true;

    /**
     * @ORM\OneToMany(targetEntity="RouteGuard", mappedBy="page")
     */
    public $guards;

    /**
     * @ORM\OneToMany(targetEntity="ContentBlock", mappedBy="page")
     */
    public $blocks;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'path' => $this->path,
            'type' => $this->type,
            'visible' => $this->visible,
            'guards' => $this->guards
        ];
    }
}
