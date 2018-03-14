<?php
namespace JNL\Controller;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Transformer\MenuTransformer;
use League\Fractal\Resource\Collection;

class MenuController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('menus', '/menus', 'getMenus');
    }

    public function getMenus()
    {
        $menuRepo = $this->getEntityManager()->getRepository('JNL\Entity\Menu');
        $menus = $menuRepo->findAll();

        $resource = $this->createCollection($menus, MenuTransformer::class);

        return $resource;
    }
}
