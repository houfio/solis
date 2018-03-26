<?php
namespace JNL\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="content_blocks")
 * @ORM\Entity
 */
class ContentBlock
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Page", inversedBy="blocks")
     * @ORM\JoinColumn(nullable=true)
     */
    public $page;

    /**
     * @ORM\OneToOne(targetEntity="JNL\Entities\BlockData\BlockData", mappedBy="block")
     */
    public $data;

    /**
     * @ORM\Column(type="integer")
     */
    public $order;

    /**
     * @ORM\ManyToOne(targetEntity="ContentBlock", inversedBy="children")
     * @ORM\JoinColumn(nullable=true)
     */
    public $parent;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    public $parent_data;

    /**
     * @ORM\Column(type="boolean")
     */
    public $hidden = false;

    /**
     * @ORM\OneToMany(targetEntity="ContentBlock", mappedBy="parent")
     */
    public $children;

    public function __construct()
    {
        $this->children = new ArrayCollection();
    }
}
