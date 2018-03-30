<?php
namespace Solis\Core;

use Solis\Core\Interfaces\ContainerAwareInterface;
use Solis\Core\Interfaces\EntityManagerAwareInterface;
use Solis\Core\Interfaces\RequestAwareInterface;
use Solis\Core\Traits\ContainerAwareTrait;
use Solis\Core\Traits\EntityManagerAwareTrait;
use Solis\Core\Traits\RequestAwareTrait;
use Solis\Core\Traits\ResourceCreationTrait;
use Solis\Core\Traits\UserAwareTrait;
use League\Fractal\TransformerAbstract;

abstract class Transformer extends TransformerAbstract implements ContainerAwareInterface, RequestAwareInterface, EntityManagerAwareInterface
{
    use ContainerAwareTrait;
    use RequestAwareTrait;
    use EntityManagerAwareTrait;
    use ResourceCreationTrait;
    use UserAwareTrait;
}
