<?php
namespace JNL\Core\Traits;

use Doctrine\Common\Collections\Collection as DoctrineCollection;
use JNL\Entities\User;
use League\Container\ContainerInterface;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

trait ResourceCreationTrait
{
    public abstract function getContainer(): ContainerInterface;

    public abstract function getAuthenticatedUser(boolean $throw): ?User;

    protected function createItem($data, string $transformer)
    {
        return new Item($data, $this->getContainer()->get($transformer));
    }

    protected function createCollection($data, string $transformer)
    {
        if ($data instanceof DoctrineCollection) {
            $data = $data->toArray();
        }

        return new Collection($this->collectionFilter($data), $this->getContainer()->get($transformer));
    }

    private function collectionFilter(array $array): array
    {
        $user = $this->getAuthenticatedUser(false);

        return array_filter($array, function ($item) use ($user) {
            if (!$user && isset($item->hidden) && $item->hidden) {
                return false;
            }

            return true;
        });
    }
}
