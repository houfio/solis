import { Resolve, Resolver, ResolverInterface } from 'vesper';

import { BlogPost } from '../entity/BlogPost';
import { filterPromise } from '../util/filterPromise';

@Resolver(BlogPost)
export class BlogPostResolver implements ResolverInterface<BlogPost> {
  @Resolve()
  public tags(posts: BlogPost | BlogPost[]) {
    return filterPromise(posts, (post) => post.tags, (tag) => !tag.deleted);
  }
}
