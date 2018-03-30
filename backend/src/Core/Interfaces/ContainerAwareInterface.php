<?php
namespace Solis\Core\Interfaces;

use League\Container\ContainerInterface;

interface ContainerAwareInterface
{
    public function getContainer(): ContainerInterface;

    public function setContainer(ContainerInterface $container);
}
