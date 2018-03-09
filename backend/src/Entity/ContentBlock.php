<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="content_blocks")
 * @ORM\Entity
 */
class ContentBlock implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="Page")
     * @ORM\JoinColumn(nullable=true)
     */
    public $page;

    /**
     * @ORM\ManyToOne(targetEntity="ContentBlock")
     * @ORM\JoinColumn(nullable=true)
     */
    public $parent;

    /**
     * @ORM\OneToOne(targetEntity="JNL\Entity\BlockData\AbstractBlockData", mappedBy="block")
     */
    public $data;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $type;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    public $parent_data;

    /**
     * @ORM\Column(type="boolean")
     */
    public $visible = true;

    /**
     * @ORM\OneToMany(targetEntity="ContentBlock", mappedBy="parent")
     */
    public $children;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'page_id' => $this->page->id,
            'type' => $this->type,
            'data' => $this->data,
            'parent_data' => $this->parent_data,
            'visible' => $this->visible,
            'children' => $this->children
        ];
    }
}
