<?php
namespace JNL\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="logins")
 * @ORM\Entity
 */
class Login implements JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
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

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date->format('Y-m-d H:i'),
            'user_agent' => $this->user_agent,
            'ip_address' => $this->ip_address
        ];
    }
}
