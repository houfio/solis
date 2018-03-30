<?php
namespace Solis\Controllers;

use Solis\Core\Controller;
use Solis\Core\RouteSet;
use Solis\Entities\Menu;
use Solis\Transformers\Menu\MenuTransformer;

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
