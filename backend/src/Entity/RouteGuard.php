<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="route_guards")
 * @ORM\Entity
 */
class RouteGuard
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
}
