<?php
namespace Solis\Providers;

use Solis\Controllers\ApiController;
use Solis\Controllers\BlogController;
use Solis\Controllers\MenuController;
use Solis\Controllers\PageController;
use Solis\Controllers\UserController;
use League\Container\ServiceProvider\AbstractServiceProvider;

class ControllerProvider extends AbstractServiceProvider
{
    const CONTROLLERS = [
        ApiController::class,
        UserController::class,
        MenuController::class,
        PageController::class,
        BlogController::class
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
