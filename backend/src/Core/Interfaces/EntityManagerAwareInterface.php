<?php
namespace Solis\Core\Interfaces;

use Doctrine\ORM\EntityManager;

interface EntityManagerAwareInterface
{
    public function getEntityManager(): EntityManager;

    public function setEntityManager(EntityManager $manager);
}
