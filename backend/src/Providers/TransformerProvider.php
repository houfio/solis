<?php
namespace Solis\Providers;

use Solis\Core\Serializer;
use Solis\Transformers\ContentBlock\ButtonBlockTransformer;
use Solis\Transformers\ContentBlock\ColumnBlockTransformer;
use Solis\Transformers\ContentBlock\ContentBlockTransformer;
use Solis\Transformers\ContentBlock\HeroBlockTransformer;
use Solis\Transformers\ContentBlock\TextBlockTransformer;
use Solis\Transformers\Menu\MenuColumnTransformer;
use Solis\Transformers\Menu\MenuItemTransformer;
use Solis\Transformers\Menu\MenuTargetTransformer;
use Solis\Transformers\Menu\MenuTransformer;
use Solis\Transformers\Page\PageGuardTransformer;
use Solis\Transformers\Page\PageTransformer;
use Solis\Transformers\Route\RouteArgumentTransformer;
use Solis\Transformers\Route\RouteTransformer;
use Solis\Transformers\Blog\BlogPostTransformer;
use Solis\Transformers\User\ContactDataTransformer;
use Solis\Transformers\User\TokenTransformer;
use Solis\Transformers\User\UserTransformer;
use League\Container\ServiceProvider\AbstractServiceProvider;
use League\Fractal\Manager;

class TransformerProvider extends AbstractServiceProvider
{
    const TRANSFORMERS = [
        RouteTransformer::class,
        RouteArgumentTransformer::class,
        MenuTransformer::class,
        MenuItemTransformer::class,
        MenuColumnTransformer::class,
        MenuTargetTransformer::class,
        PageTransformer::class,
        PageGuardTransformer::class,
        UserTransformer::class,
        ContactDataTransformer::class,
        TokenTransformer::class,
        ContentBlockTransformer::class,
        TextBlockTransformer::class,
        ButtonBlockTransformer::class,
        ColumnBlockTransformer::class,
        HeroBlockTransformer::class,
        BlogPostTransformer::class
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
