<?php
namespace JNL\Core\Traits;

use League\Container\ContainerAwareTrait;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

trait ResourceCreationTrait
{
    use ContainerAwareTrait;

    protected function createItem($data, $transformer)
    {
        return new Item($data, new $transformer($this->getContainer()));
    }

    protected function createCollection($data, $transformer)
    {
        return new Collection($data, new $transformer($this->getContainer()));
    }
}
