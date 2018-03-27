<?php
namespace JNL\Controllers;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Entities\BlogPost;
use JNL\Transformers\Blog\BlogPostTransformer;
use League\Container\Exception\NotFoundException;
use League\Route\Http\Exception\UnauthorizedException;

class BlogController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('blogs', '/blogs', 'getBlog')
            ->get('blog', '/blogs/{id:number}', 'getBlogDetails')
            ->post('blog_create', '/blogs', 'postBlog', true, [
                'title' => ['required', 'lengthMax' => [128]],
                'content' => ['required']
            ])
            ->post('blog_remove', '/blogs/{id:number}/remove', 'postBlogRemove', true)
            ->post('blog_update', '/blogs/{id:number}', 'postBlogUpdate', true, [
                'title' => [],
                'content' => []
            ]);
    }

    public function getBlog()
    {
        $blogPostRepo = $this->getEntityManager()->getRepository(BlogPost::class);
        $blogPosts = $blogPostRepo->findBy(['deleted' => false]);

        $resource = $this->createCollection($blogPosts, BlogPostTransformer::class);

        return $resource;
    }

    public function getBlogDetails(array $args, array $vars)
    {
        $blogPostRepo = $this->getEntityManager()->getRepository(BlogPost::class);
        $blogPost = $blogPostRepo->findOneBy(['id' => $vars['id'], 'deleted' => false]);

        if (!$blogPost) {
            throw new NotFoundException();
        }

        $resource = $this->createItem($blogPost, BlogPostTransformer::class);
        $this->includeTransformations(['content']);

        return $resource;
    }

    public function postBlog(array $args)
    {
        $user = $this->getAuthenticatedUser();

        if (!$user->admin) {
            throw new UnauthorizedException();
        }

        $blogPost = new BlogPost();
        $blogPost->title = $args['title'];
        $blogPost->content = $args['content'];

        $this->getEntityManager()->persist($blogPost);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postBlogRemove(array $args, array $vars)
    {
        $user = $this->getAuthenticatedUser();

        if (!$user->admin) {
            throw new UnauthorizedException();
        }

        $blogPostRepo = $this->getEntityManager()->getRepository(BlogPost::class);
        $blogPost = $blogPostRepo->findOneBy(['id' => $vars['id']]);

        if (!$blogPost) {
            return false;
        }

        $blogPost->deleted = true;

        $this->getEntityManager()->merge($blogPost);
        $this->getEntityManager()->flush();

        return true;
    }

    public function postBlogUpdate(array $args, array $vars)
    {
        $user = $this->getAuthenticatedUser();

        if (!$user->admin) {
            throw new UnauthorizedException();
        }

        $blogPostRepo = $this->getEntityManager()->getRepository(BlogPost::class);
        $blogPost = $blogPostRepo->findOneBy(['id' => $vars['id']]);

        if (!$blogPost) {
            return false;
        }

        foreach ($args as $key => $value) {
            $blogPost->$key = $value;
        }

        $this->getEntityManager()->merge($blogPost);
        $this->getEntityManager()->flush();

        return true;
    }
}
