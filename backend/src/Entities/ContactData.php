<?php
namespace JNL\Entities;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="contact_data")
 * @ORM\Entity
 */
class ContactData
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
}
