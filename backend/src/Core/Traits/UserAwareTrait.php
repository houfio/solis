<?php
namespace JNL\Core\Traits;

use Doctrine\ORM\EntityManager;
use JNL\Entity\Login;
use JNL\Entity\User;
use League\Route\Http\Exception\UnauthorizedException;
use Zend\Diactoros\ServerRequest;

trait UserAwareTrait
{
    public abstract function getRequest(): ServerRequest;

    public abstract function getEntityManager(): EntityManager;

    protected function getAuthenticatedUser($throw = true): ?User
    {
        if (!$this->getRequest()->hasHeader('Authorization')) {
            if ($throw) {
                throw new UnauthorizedException();
            }

            return null;
        }

        $login_repo = $this->getEntityManager()->getRepository(Login::class);
        /** @var Login $login */
        $login = $login_repo->findOneBy(['token' => $this->getRequest()->getHeader('Authorization'), 'active' => true]);

        if (!$login || !$login->user->approved) {
            if ($throw) {
                throw new UnauthorizedException();
            }

            return null;
        }

        return $login->user;
    }
}
