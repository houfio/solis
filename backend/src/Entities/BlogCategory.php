<?php
namespace JNL\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="blog_categories")
 * @ORM\Entity
 */
class BlogCategory
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
     * @ORM\OneToMany(targetEntity="BlogCategory", mappedBy="category")
     */
    public $posts;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }
}
