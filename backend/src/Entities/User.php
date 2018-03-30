<?php
namespace Solis\Entities;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity
 */
class User
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\OneToOne(targetEntity="ContactData")
     */
    public $contact_data;

    /**
     * @ORM\Column(type="boolean")
     */
    public $admin = false;

    /**
     * @ORM\Column(type="integer", unique=true)
     */
    public $membership_id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $membership_section;

    /**
     * @ORM\Column(type="string", length=72)
     */
    public $password;

    /**
     * @ORM\Column(type="datetime")
     */
    public $creation_date;

    /**
     * @ORM\Column(type="boolean")
     */
    public $receive_emails = true;

    /**
     * @ORM\Column(type="boolean")
     */
    public $approved = false;

    /**
     * @ORM\OneToMany(targetEntity="Token", mappedBy="user")
     */
    public $tokens;

    public function __construct()
    {
        $this->creation_date = new DateTime();
        $this->tokens = new ArrayCollection();
    }
}
