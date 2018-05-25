import { Inject } from 'typedi';
import { EntityManager } from 'typeorm';
import { isLength } from 'validator';
import { Controller, Mutation, Query } from 'vesper';

import { Identifier } from '../argument/Identifier';
import { PostCreate } from '../argument/PostCreate';
import { Posts } from '../argument/Posts';
import { PostUpdate } from '../argument/PostUpdate';
import { TagCreate } from '../argument/TagCreate';
import { Admin } from '../decorator/Admin';
import { Validate } from '../decorator/Validate';
import { BlogPost } from '../entity/BlogPost';
import { BlogTag } from '../entity/BlogTag';
import { User } from '../entity/User';
import { updateObject } from '../util/updateObject';

@Controller()
export class BlogController {
  @Inject()
  private entityManager!: EntityManager;

  @Inject()
  private currentUser?: User;

  @Query()
  public posts(args: Posts) {
    let query = this.entityManager
      .createQueryBuilder(BlogPost, 'post')
      .where('deleted = false')
      .take(args.limit)
      .skip(args.offset);

    if (args.tag) {
      query = query
        .innerJoin(BlogTag, 'tag', 'tag.post = post.id')
        .andWhere('tag.tag = :tag', { tag: args.tag });
    }

    return query.getMany();
  }

  @Query()
  @Validate()
  public post({ id }: Identifier) {
    return this.entityManager.findOne(BlogPost, { id, deleted: false });
  }

  @Mutation()
  @Validate<PostCreate>((obj) => {
    if (!isLength(obj.title, 1, 255)) {
      return false;
    }

    for (const tag of obj.tags) {
      if (!isLength(tag, 1, 32)) {
        return false;
      }
    }

    return true;
  })
  @Admin()
  public async createPost(args: PostCreate) {
    const post = new BlogPost();
    post.title = args.title;
    post.content = args.content;
    post.creationDate = new Date();
    post.author = Promise.resolve(this.currentUser!);

    await this.entityManager.save(post);

    for (const t of args.tags) {
      await this.addTag(post, t);
    }

    return this.entityManager.findOne(BlogPost, post.id);
  }

  @Mutation()
  @Validate()
  @Admin(false)
  public async deletePost({ id }: Identifier) {
    await this.entityManager.update(BlogPost, id, {
      deleted: true
    });

    return true;
  }

  @Mutation()
  @Validate<PostUpdate>((obj) => {
    return !(obj.input.title && isLength(obj.input.title, 1, 255));
  })
  @Admin()
  public async updatePost(args: PostUpdate) {
    const post = await this.entityManager.findOneOrFail(BlogPost, { id: args.id, deleted: false });

    return this.entityManager.save(updateObject(post, args.input));
  }

  @Mutation()
  @Validate<TagCreate>((obj) => {
    return isLength(obj.tag, 1, 32);
  })
  @Admin()
  public async createTag(args: TagCreate) {
    const post = await this.entityManager.findOneOrFail(BlogPost, { id: args.id, deleted: false });

    return this.addTag(post, args.tag);
  }

  @Mutation()
  @Validate()
  @Admin(false)
  public async deleteTag({ id }: Identifier) {
    await this.entityManager.update(BlogTag, id, {
      deleted: true
    });

    return true;
  }

  private async addTag(post: BlogPost, tag: string) {
    const t = new BlogTag();
    t.post = Promise.resolve(post);
    t.tag = tag;

    await this.entityManager.save(t);
  }
}
