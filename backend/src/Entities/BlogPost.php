<?php
namespace JNL\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="blog_posts")
 * @ORM\Entity
 */
class BlogPost
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
    public $title;

    /**
     * @ORM\Column(type="text")
     */
    public $content;

    /**
     * @ORM\Column(type="datetime")
     */
    public $date;

    /**
     * @ORM\Column(type="boolean")
     */
    public $deleted = false;

    /**
     * @ORM\OneToMany(targetEntity="BlogCategory", mappedBy="post")
     */
    public $categories;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }
}
