<?php
namespace JNL\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;

class ControllerProvider extends AbstractServiceProvider
{
    const CONTROLLERS = [
        'JNL\Controller\ApiController',
        'JNL\Controller\UserController',
        'JNL\Controller\MenuController'
    ];

    public function provides($alias = null)
    {
        return static::CONTROLLERS;
    }

    public function register()
    {
        foreach (static::CONTROLLERS as $controllers) {
            $this->getContainer()->share($controllers);
        }
    }
}
