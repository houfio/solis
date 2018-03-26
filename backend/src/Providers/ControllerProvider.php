<?php
namespace JNL\Providers;

use JNL\Controllers\ApiController;
use JNL\Controllers\MenuController;
use JNL\Controllers\PageController;
use JNL\Controllers\UserController;
use League\Container\ServiceProvider\AbstractServiceProvider;

class ControllerProvider extends AbstractServiceProvider
{
    const CONTROLLERS = [
        ApiController::class,
        UserController::class,
        MenuController::class,
        PageController::class
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
