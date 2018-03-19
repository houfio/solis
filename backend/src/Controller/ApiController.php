<?php
namespace JNL\Controller;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Transformer\Route\RouteTransformer;
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
        /** @var RouteSet $pageSet */
        $pages = $this->getContainer()->get('pages');
        $resource = $this->createCollection($pages->getRoutes(), RouteTransformer::class);

        return $resource;
    }

    public function optionsApi()
    {
        return (new EmptyResponse())
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST')
            ->withHeader('Access-Control-Allow-Headers', 'Authorization');
    }
}
