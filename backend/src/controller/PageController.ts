import { Inject } from 'typedi';
import { EntityManager } from 'typeorm';
import { isLength, isUUID } from 'validator';
import { Controller, Mutation, Query } from 'vesper';

import { BlockCreate } from '../argument/BlockCreate';
import { BlockUpdate } from '../argument/BlockUpdate';
import { Identifier } from '../argument/Identifier';
import { PageCreate } from '../argument/PageCreate';
import { PageUpdate } from '../argument/PageUpdate';
import { Authenticated } from '../decorator/Authenticated';
import { Validate } from '../decorator/Validate';
import { Page } from '../entity/Page';
import { PageBlock } from '../entity/PageBlock';
import { PageBlockData } from '../entity/PageBlockData';
import { User } from '../entity/User';
import { updateObject } from '../util/updateObject';

@Controller()
export class PageController {
  @Inject()
  private entityManager!: EntityManager;

  @Inject()
  private currentUser?: User;

  @Query()
  public pages() {
    return this.entityManager.find(Page, { deleted: false, ...!Boolean(this.currentUser) && { hidden: false } });
  }

  @Query()
  @Validate()
  public page({ id }: Identifier) {
    return this.entityManager.findOne(Page, id);
  }

  @Mutation()
  @Validate<PageCreate>((obj) => {
    return isLength(obj.name, 1, 255) || (obj.type === undefined || obj.type === 'home');
  })
  @Authenticated(true)
  public createPage(args: PageCreate) {
    const page = new Page();

    page.name = args.name;
    page.path = args.path;
    page.type = args.type;
    page.hidden = args.hidden;

    return this.entityManager.save(page);
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(true, false)
  public async deletePage({ id }: Identifier) {
    await this.entityManager.update(Page, id, {
      deleted: true
    });

    return true;
  }

  @Mutation()
  @Validate<PageUpdate>((obj) => {
    return !(obj.input.name && isLength(obj.input.name, 1, 255)) ||
      !(obj.input.type === undefined || obj.input.type === 'home');
  })
  @Authenticated(true)
  public async updatePage(args: PageUpdate) {
    const page = await this.entityManager.findOne(Page, { id: args.id, deleted: false });

    if (!page) {
      return null;
    }

    return this.entityManager.save(updateObject(page, args.input));
  }

  @Mutation()
  @Validate<BlockCreate>((obj) => {
    return !(
      (obj.parent && !isUUID(obj.parent, 4)) ||
      (obj.parent && !obj.parentData) ||
      (!obj.parent && obj.order === undefined));
  })
  @Authenticated(true)
  public async createBlock(args: BlockCreate) {
    const block = new PageBlock();

    block.type = args.type;

    if (args.parent) {
      const parent = await this.entityManager.findOne(PageBlock, {
        id: args.parent,
        deleted: false
      });

      if (!parent) {
        return null;
      }

      block.parent = Promise.resolve(parent);
      block.parentData = args.parentData;
    } else {
      block.order = args.order;
    }

    const saved = await this.entityManager.save(block);

    const data = updateObject(new PageBlockData(), JSON.parse(args.data));
    data.block = Promise.resolve(saved);

    await this.entityManager.save(data);

    return saved;
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(true, false)
  public async deleteBlock({ id }: Identifier) {
    await this.entityManager.update(PageBlock, id, {
      deleted: true
    });

    return true;
  }

  @Mutation()
  @Validate<BlockUpdate>((obj) => {
    return !(
      (obj.input.parent && !isUUID(obj.input.parent, 4)) ||
      (obj.input.parent && !obj.input.parentData) ||
      (!obj.input.parent && obj.input.order === undefined));
  })
  @Authenticated(true)
  public async updateBlock(args: BlockUpdate) {
    const block = await this.entityManager.findOne(PageBlock, {
      id: args.id,
      deleted: false
    });

    if (!block) {
      return null;
    }

    if (args.input.parent) {
      const parent = await this.entityManager.findOne(PageBlock, {
        id: args.input.parent,
        deleted: false
      });

      if (!parent) {
        return null;
      }

      block.parent = Promise.resolve(parent);
      block.parentData = args.input.parentData;
    } else {
      block.order = args.input.order;
    }

    if (args.input.data) {
      const data = await block.data;

      await this.entityManager.save()
    }
  }
}
