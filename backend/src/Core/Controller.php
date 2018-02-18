<?php
namespace JNL\Core;

use JNL\Core\Traits\EntityManagerAwareTrait;
use JNL\Core\Traits\RequestAwareTrait;
use JNL\Core\Interfaces\EntityManagerAwareInterface;
use JNL\Core\Interfaces\RequestAwareInterface;
use JNL\Entity\Login;
use JNL\Entity\User;
use League\Container\ContainerAwareInterface;
use League\Container\ContainerAwareTrait;
use League\Route\Http\Exception\UnauthorizedException;

abstract class Controller implements ContainerAwareInterface, RequestAwareInterface, EntityManagerAwareInterface
{
    use ContainerAwareTrait;
    use RequestAwareTrait;
    use EntityManagerAwareTrait;

    public abstract function initialize(): RouteSet;

    public function getAuthenticatedUser(): User
    {
        if (!$this->getRequest()->hasHeader('Authorization')) {
            throw new UnauthorizedException();
        }

        $login_repo = $this->getEntityManager()->getRepository('JNL\Entity\Login');
        /** @var Login $login */
        $login = $login_repo->findOneBy(['token' => $this->getRequest()->getHeader('Authorization')]);

        if (!$login || !$login->active || !$login->user->approved) {
            throw new UnauthorizedException();
        }

        return $login->user;
    }
}
