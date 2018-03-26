<?php
namespace JNL\Controllers;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Entities\Menu;
use JNL\Transformers\Menu\MenuTransformer;

class MenuController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('menus', '/menus', 'getMenus');
    }

    public function getMenus()
    {
        $menuRepo = $this->getEntityManager()->getRepository(Menu::class);
        $menus = $menuRepo->findAll();

        $resource = $this->createCollection($menus, MenuTransformer::class);

        return $resource;
    }
}
