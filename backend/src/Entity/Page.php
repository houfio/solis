<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="pages")
 * @ORM\Entity
 */
class Page
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
    public $hidden = false;

    /**
     * @ORM\Column(type="boolean")
     */
    public $draft = true;

    /**
     * @ORM\OneToMany(targetEntity="RouteGuard", mappedBy="page")
     */
    public $guards;

    /**
     * @ORM\OneToMany(targetEntity="ContentBlock", mappedBy="page")
     */
    public $blocks;
}
