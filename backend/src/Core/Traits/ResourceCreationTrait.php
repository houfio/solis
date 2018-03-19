<?php
namespace JNL\Core\Traits;

use League\Container\ContainerInterface;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

trait ResourceCreationTrait
{
    public abstract function getContainer(): ContainerInterface;

    protected function createItem($data, string $transformer)
    {
        return new Item($data, $this->getContainer()->get($transformer));
    }

    protected function createCollection($data, string $transformer)
    {
        return new Collection($data, $this->getContainer()->get($transformer));
    }
}
