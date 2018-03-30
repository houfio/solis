<?php
namespace Solis\Core;

use Solis\Core\Interfaces\ContainerAwareInterface;
use Solis\Core\Interfaces\TransformerAwareInterface;
use Solis\Core\Traits\ContainerAwareTrait;
use Solis\Core\Traits\EntityManagerAwareTrait;
use Solis\Core\Traits\RequestAwareTrait;
use Solis\Core\Interfaces\EntityManagerAwareInterface;
use Solis\Core\Interfaces\RequestAwareInterface;
use Solis\Core\Traits\ResourceCreationTrait;
use Solis\Core\Traits\TransformerAwareTrait;
use Solis\Core\Traits\UserAwareTrait;

abstract class Controller implements ContainerAwareInterface, RequestAwareInterface, EntityManagerAwareInterface, TransformerAwareInterface
{
    use ContainerAwareTrait;
    use RequestAwareTrait;
    use EntityManagerAwareTrait;
    use ResourceCreationTrait;
    use UserAwareTrait;
    use TransformerAwareTrait;

    public abstract function initialize(): RouteSet;
}
