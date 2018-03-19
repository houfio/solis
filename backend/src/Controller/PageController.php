<?php
namespace JNL\Controller;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Entity\Page;
use JNL\Transformer\Page\PageTransformer;

class PageController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('pages', '/pages', 'getPages');
    }

    public function getPages()
    {
        $menuRepo = $this->getEntityManager()->getRepository(Page::class);
        $menus = $menuRepo->findAll();

        $resource = $this->createCollection($menus, PageTransformer::class);

        return $resource;
    }
}
