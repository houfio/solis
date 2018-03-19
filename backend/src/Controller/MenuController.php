<?php
namespace JNL\Controller;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Entity\Menu;
use JNL\Transformer\Menu\MenuTransformer;

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
