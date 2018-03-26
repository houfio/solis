<?php
namespace JNL\Core;

use JNL\Core\Interfaces\ContainerAwareInterface;
use JNL\Core\Interfaces\EntityManagerAwareInterface;
use JNL\Core\Interfaces\RequestAwareInterface;
use JNL\Core\Traits\ContainerAwareTrait;
use JNL\Core\Traits\EntityManagerAwareTrait;
use JNL\Core\Traits\RequestAwareTrait;
use JNL\Core\Traits\ResourceCreationTrait;
use JNL\Core\Traits\UserAwareTrait;
use League\Fractal\TransformerAbstract;

abstract class Transformer extends TransformerAbstract implements ContainerAwareInterface, RequestAwareInterface, EntityManagerAwareInterface
{
    use ContainerAwareTrait;
    use RequestAwareTrait;
    use EntityManagerAwareTrait;
    use ResourceCreationTrait;
    use UserAwareTrait;
}
