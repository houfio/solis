<?php
namespace JNL\Provider;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Zend\Diactoros\ServerRequestFactory;

class RequestProvider extends AbstractServiceProvider
{
    protected $provides = [
        'request'
    ];

    public function register()
    {
        $this->getContainer()->share('request', function () {
            return ServerRequestFactory::fromGlobals();
        });
    }
}
