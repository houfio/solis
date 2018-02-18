<?php
namespace JNL\Controller;

use JNL\Core\Controller;
use JNL\Core\Route;
use JNL\Core\RouteSet;
use Zend\Diactoros\Response\EmptyResponse;

class ApiController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('api', '/', 'getApi');
    }

    public function getApi()
    {
        return $this->getContainer()->get('routes');
    }

    public function optionsApi()
    {
        return (new EmptyResponse())
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST')
            ->withHeader('Access-Control-Allow-Headers', 'Authorization');
    }
}
