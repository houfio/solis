<?php
namespace Solis\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="page_guards")
 * @ORM\Entity
 */
class PageGuard
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Page", inversedBy="guards")
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
