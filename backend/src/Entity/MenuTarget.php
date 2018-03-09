<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="menu_targets")
 * @ORM\Entity
 */
class MenuTarget implements JsonSerializable
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

    public function jsonSerialize(): number
    {
        return $this->target;
    }
}
