<?php
namespace JNL\Core;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityRepository;
use JNL\Core\Traits\ResourceCreationTrait;
use JNL\Entity\Login;
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

    protected function isAuthenticated(): bool
    {
        $request = $this->getContainer()->get('request');
        $entityManager = $this->getContainer()->get('entityManager');

        if (!$request->hasHeader('Authorization')) {
            return false;
        }

        /** @var EntityRepository $login_repo */
        $login_repo = $entityManager->getRepository('JNL\Entity\Login');
        /** @var Login $login */
        $login = $login_repo->findOneBy(['token' => $request->getHeader('Authorization'), 'active' => true]);

        if (!$login || !$login->user->approved) {
            return false;
        }

        return true;
    }

    public function filter(Collection $array, array $filters): array
    {
        $authenticated = $this->isAuthenticated();

        return array_filter($array->toArray(), function ($item) use ($filters, $authenticated) {
            foreach ($filters as $filter => $value) {
                if (!$value($item->$filter, $authenticated)) {
                    return false;
                }
            }

            return true;
        });
    }
}
