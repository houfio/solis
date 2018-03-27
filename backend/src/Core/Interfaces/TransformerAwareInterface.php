<?php
namespace JNL\Core\Interfaces;

use League\Fractal\Manager;

interface TransformerAwareInterface
{
    public function getTransformer(): Manager;

    public function setTransformer(Manager $transformer);
}
