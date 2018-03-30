<?php
namespace Solis\Core\Traits;

use League\Fractal\Manager;

trait TransformerAwareTrait
{
    private $transformer;

    public function getTransformer(): Manager
    {
        return $this->transformer;
    }

    public function setTransformer(Manager $transformer)
    {
        $this->transformer = $transformer;
    }

    public function includeTransformations(array $fields)
    {
        $this->getTransformer()->parseIncludes(join(',', $fields));
    }

    public function excludeTransformations(array $fields)
    {
        $this->getTransformer()->parseExcludes(join(',', $fields));
    }
}
