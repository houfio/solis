<?php
namespace JNL\Entities;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="tokens")
 * @ORM\Entity
 */
class Token
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="tokens")
     */
    public $user;

    /**
     * @ORM\Column(type="string", length=128, unique=true)
     */
    public $token;

    /**
     * @ORM\Column(type="boolean")
     */
    public $active = true;

    /**
     * @ORM\Column(type="datetime")
     */
    public $date;

    /**
     * @ORM\Column(type="string", length=256)
     */
    public $user_agent;

    /**
     * @ORM\Column(type="string", length=16)
     */
    public $ip_address;

    public function __construct()
    {
        $this->date = new DateTime('now');
    }
}
