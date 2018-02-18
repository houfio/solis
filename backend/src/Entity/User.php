<?php
namespace JNL\Entity;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity
 */
class User implements JsonSerializable
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
     * @ORM\OneToMany(targetEntity="Login", mappedBy="user")
     */
    public $logins;

    public function __construct()
    {
        $this->creation_date = new DateTime();
        $this->logins = new ArrayCollection();
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'contact_data' => $this->contact_data,
            'admin' => $this->admin,
            'membership' => [
                'id' => $this->membership_id,
                'section' => $this->membership_section,
            ],
            'creation_date' => $this->creation_date->format('Y-m-d H:i'),
            'receive_emails' => $this->receive_emails,
            'logins' => array_filter($this->logins->toArray(), function ($var) {
                return $var->active;
            })
        ];
    }
}
