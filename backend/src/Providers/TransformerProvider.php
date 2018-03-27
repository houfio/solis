<?php
namespace JNL\Providers;

use JNL\Core\Serializer;
use JNL\Transformers\ContentBlock\ButtonBlockTransformer;
use JNL\Transformers\ContentBlock\ColumnBlockTransformer;
use JNL\Transformers\ContentBlock\ContentBlockTransformer;
use JNL\Transformers\ContentBlock\HeroBlockTransformer;
use JNL\Transformers\ContentBlock\TextBlockTransformer;
use JNL\Transformers\Menu\MenuColumnTransformer;
use JNL\Transformers\Menu\MenuItemTransformer;
use JNL\Transformers\Menu\MenuTargetTransformer;
use JNL\Transformers\Menu\MenuTransformer;
use JNL\Transformers\Page\PageGuardTransformer;
use JNL\Transformers\Page\PageTransformer;
use JNL\Transformers\Route\RouteArgumentTransformer;
use JNL\Transformers\Route\RouteTransformer;
use JNL\Transformers\Blog\BlogPostTransformer;
use JNL\Transformers\User\ContactDataTransformer;
use JNL\Transformers\User\TokenTransformer;
use JNL\Transformers\User\UserTransformer;
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
