<?php
namespace JNL\Controllers;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Entities\ContentBlock;
use JNL\Entities\Page;
use JNL\Transformers\ContentBlock\ContentBlockTransformer;
use JNL\Transformers\Page\PageTransformer;

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
