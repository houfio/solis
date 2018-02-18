<?php
namespace JNL\Core\Traits;

use Doctrine\ORM\EntityManager;

trait EntityManagerAwareTrait
{
    private $manager;

    public function getEntityManager(): EntityManager
    {
        return $this->manager;
    }

    public function setEntityManager(EntityManager $manager)
    {
        $this->manager = $manager;
    }
}
