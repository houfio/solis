<?php
namespace Solis\Providers;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Zend\Diactoros\Request;
use Zend\Diactoros\Response;
use Zend\Diactoros\Response\RedirectResponse;

class ResponseProvider extends AbstractServiceProvider
{
    protected $provides = [
        'response'
    ];

    public function register()
    {
        $this->getContainer()->share('response', function () {
            $request = $this->getContainer()->get('request');
            $dispatcher = $this->getContainer()->get('dispatcher');

            return $dispatcher->dispatch($request, new Response());
        });
    }
}
