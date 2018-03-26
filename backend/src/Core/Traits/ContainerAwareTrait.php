<?php
namespace JNL\Core\Traits;

use League\Container\ContainerInterface;

trait ContainerAwareTrait
{
    private $container;

    public function getContainer(): ContainerInterface
    {
        return $this->container;
    }

    public function setContainer(ContainerInterface $container)
    {
        $this->container = $container;
    }
}
