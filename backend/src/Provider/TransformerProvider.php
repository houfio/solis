<?php
namespace JNL\Provider;

use JNL\Core\Serializer;
use League\Container\ServiceProvider\AbstractServiceProvider;
use League\Fractal\Manager;

class TransformerProvider extends AbstractServiceProvider
{
    const TRANSFORMERS = [
        'JNL\Transformer\Route\RouteTransformer',
        'JNL\Transformer\Route\RouteArgumentTransformer',
        'JNL\Transformer\Menu\MenuTransformer',
        'JNL\Transformer\Menu\MenuItemTransformer',
        'JNL\Transformer\Menu\MenuColumnTransformer',
        'JNL\Transformer\Menu\MenuTargetTransformer'
    ];

    protected $provides = [
        'transformer'
    ];

    public function provides($alias = null)
    {
        return array_merge($this->provides, static::TRANSFORMERS);
    }

    public function register()
    {
        $this->getContainer()->share('transformer', function () {
            return (new Manager())->setSerializer(new Serializer());
        });

        foreach (static::TRANSFORMERS as $transformer) {
            $this->getContainer()->share($transformer);
        }
    }
}
