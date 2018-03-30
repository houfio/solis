<?php
namespace Solis\Controllers;

use Solis\Core\Controller;
use Solis\Core\RouteSet;
use Solis\Entities\ContentBlock;
use Solis\Entities\Page;
use Solis\Transformers\ContentBlock\ContentBlockTransformer;
use Solis\Transformers\Page\PageTransformer;

class PageController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('pages', '/pages', 'getPages')
            ->get('content_blocks', '/pages/{id:number}', 'getContentBlocks');
    }

    public function getPages()
    {
        $menuRepo = $this->getEntityManager()->getRepository(Page::class);
        $menus = $menuRepo->findAll();

        $resource = $this->createCollection($menus, PageTransformer::class);

        return $resource;
    }

    public function getContentBlocks(array $args, array $vars)
    {
        $blockRepo = $this->getEntityManager()->getRepository(ContentBlock::class);
        $blocks = $blockRepo->findBy(['page' => $vars['id']]);

        $resource = $this->createCollection($blocks, ContentBlockTransformer::class);

        return $resource;
    }
}
