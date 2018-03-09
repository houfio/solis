<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="route_guards")
 * @ORM\Entity
 */
class RouteGuard implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Page")
     */
    public $page;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $type;

    /**
     * @ORM\Column(type="integer")
     */
    public $target;

    public function jsonSerialize(): array
    {
        return [
            'type' => $this->type,
            'target' => $this->target
        ];
    }
}
