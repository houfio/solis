<?php
namespace Solis\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="post_categories")
 * @ORM\Entity
 */
class PostCategory
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="BlogCategory", inversedBy="posts")
     */
    public $category;

    /**
     * @ORM\ManyToOne(targetEntity="BlogPost", inversedBy="categories")
     */
    public $post;
}
