<?php
namespace JNL\Core;

use Doctrine\Common\Collections\Collection;
use JNL\Core\Traits\ResourceCreationTrait;
use JNL\Entity\Login;
use JNL\Entity\User;
use League\Container\ContainerAwareInterface;
use League\Container\ContainerInterface;
use League\Fractal\TransformerAbstract;

abstract class Transformer extends TransformerAbstract implements ContainerAwareInterface
{
    use ResourceCreationTrait;

    public function __construct(ContainerInterface $container)
    {
        $this->setContainer($container);
    }

    protected function getAuthenticatedUser(): ?User
    {
        $request = $this->getContainer()->get('request');
        $entityManager = $this->getContainer()->get('entityManager');

        if (!$request->hasHeader('Authorization')) {
            return null;
        }

        $login_repo = $entityManager->getRepository('JNL\Entity\Login');
        /** @var Login $login */
        $login = $login_repo->findOneBy(['token' => $request->getHeader('Authorization')]);

        if (!$login || !$login->active || !$login->user->approved) {
            return null;
        }

        return $login->user;
    }

    public function authFilter(Collection $array, ...$filters): array
    {
        $user = $this->getAuthenticatedUser();

        return array_filter($array->toArray(), function ($item) use ($user, $filters) {
            if (!$user) {
                foreach ($filters as $filter) {
                    if ($item->$filter) {
                        return false;
                    }
                }
            }

            return true;
        });
    }
}
