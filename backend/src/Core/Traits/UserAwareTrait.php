<?php
namespace JNL\Core\Traits;

use Doctrine\ORM\EntityManager;
use JNL\Entities\Token;
use JNL\Entities\User;
use League\Route\Http\Exception\UnauthorizedException;
use Zend\Diactoros\ServerRequest;

trait UserAwareTrait
{
    public abstract function getRequest(): ServerRequest;

    public abstract function getEntityManager(): EntityManager;

    public function getAuthenticatedUser($throw = true): ?User
    {
        if (!$this->getRequest()->hasHeader('Authorization')) {
            if ($throw) {
                throw new UnauthorizedException();
            }

            return null;
        }

        $tokenRepo = $this->getEntityManager()->getRepository(Token::class);
        /** @var Token $token */
        $token = $tokenRepo->findOneBy(['token' => $this->getRequest()->getHeader('Authorization'), 'active' => true]);

        if (!$token || !$token->user->approved) {
            if ($throw) {
                throw new UnauthorizedException();
            }

            return null;
        }

        return $token->user;
    }
}
