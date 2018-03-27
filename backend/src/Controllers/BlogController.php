<?php
namespace JNL\Controllers;

use JNL\Core\Controller;
use JNL\Core\RouteSet;
use JNL\Entities\BlogPost;
use League\Route\Http\Exception\UnauthorizedException;

class BlogController extends Controller
{
    public function initialize(): RouteSet
    {
        return RouteSet::create()
            ->get('blog', '/blog', 'getBlog')
            ->get('blog', '/blog/{id:number}', 'getBlogDetails')
            ->post('blog_create', '/blog', 'postBlog', true, [
                'title' => ['required'],
                'content' => ['required']
            ])
            ->post('blog_remove', '/blog/{id:number}/remove', 'postBlogRemove', true)
            ->post('blog_update', '/blog/{id:number}', 'postBlogUpdate', true, [
                'title' => [],
                'content' => []
            ]);
    }

    public function getBlog()
    {
        $blogPostRepo = $this->getEntityManager()->getRepository(BlogPost::class);
        $blogPosts = $blogPostRepo->findBy(['deleted' => false]);

        return $blogPosts;
    }

    public function getBlogDetails(array $args, array $vars)
    {
        $blogPostRepo = $this->getEntityManager()->getRepository(BlogPost::class);
        $blogPostDetails = $blogPostRepo->findOneBy(['id' => $vars['id']]);

        return $blogPostDetails;
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
