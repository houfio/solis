<?php
namespace JNL\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Table(name="contact_data")
 * @ORM\Entity
 */
class ContactData implements JsonSerializable
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
    public $first_name;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $last_name;

    /**
     * @ORM\Column(type="string", length=128)
     */
    public $email;

    /**
     * @ORM\Column(type="string", length=16)
     */
    public $phone_number;

    /**
     * @ORM\Column(type="string", length=16)
     */
    public $zip_code;

    /**
     * @ORM\Column(type="string", length=16)
     */
    public $house_number;

    /**
     * @ORM\Column(type="date")
     */
    public $birth_date;

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'zip_code' => $this->zip_code,
            'house_number' => $this->house_number,
            'birth_date' => $this->birth_date->format('Y-m-d')
        ];
    }
}
