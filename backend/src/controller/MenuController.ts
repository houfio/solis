import { Inject } from 'typedi';
import { EntityManager, LessThan, Not, ObjectType } from 'typeorm';
import { isLength, isUUID } from 'validator';
import { Controller, Mutation, Query } from 'vesper';

import { ColumnCreate } from '../argument/ColumnCreate';
import { ColumnUpdate } from '../argument/ColumnUpdate';
import { Identifier } from '../argument/Identifier';
import { ItemCreate } from '../argument/ItemCreate';
import { ItemUpdate } from '../argument/ItemUpdate';
import { TargetCreate } from '../argument/TargetCreate';
import { TargetUpdate } from '../argument/TargetUpdate';
import { Authenticated } from '../decorator/Authenticated';
import { Validate } from '../decorator/Validate';
import { MenuColumn } from '../entity/MenuColumn';
import { MenuItem } from '../entity/MenuItem';
import { MenuTarget } from '../entity/MenuTarget';
import { Page } from '../entity/Page';
import { User } from '../entity/User';
import { updateObject } from '../util/updateObject';

@Controller()
export class MenuController {
  @Inject()
  private entityManager!: EntityManager;

  @Inject()
  private currentUser?: User;

  @Query()
  public menu() {
    return this.entityManager.find(MenuItem, { deleted: false, ...!Boolean(this.currentUser) && { hidden: false } });
  }

  @Mutation()
  @Validate<ItemCreate>((obj) => {
    return isLength(obj.name, 1, 255);
  })
  @Authenticated(true)
  public async createItem(args: ItemCreate) {
    const item = new MenuItem();
    item.name = args.name;
    item.order = args.order;
    item.hidden = args.hidden;

    await this.incrementOrder(MenuItem, args.order);

    return this.entityManager.save(item);
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(true, false)
  public async deleteItem({ id }: Identifier) {
    await this.entityManager.update(MenuItem, id, {
      deleted: true
    });

    return true;
  }

  @Mutation()
  @Validate<ItemUpdate>((obj) => {
    return !obj.input.name || isLength(obj.input.name, 1, 255);
  })
  @Authenticated(true)
  public async updateItem(args: ItemUpdate) {
    const item = await this.entityManager.findOne(MenuItem, { id: args.id, deleted: false });

    if (!item) {
      return null;
    } else if (args.input.order !== undefined) {
      await this.updateOrder(MenuItem, item.order, args.input.order);
    }

    return this.entityManager.save(updateObject(item, args.input));
  }

  @Mutation()
  @Validate<ColumnCreate>((obj) => {
    return isLength(obj.name, 1, 255);
  })
  @Authenticated(true)
  public async createColumn(args: ColumnCreate) {
    const item = await this.entityManager.findOne(MenuItem, { id: args.id, deleted: false });

    if (!item) {
      return null;
    }

    const column = new MenuColumn();
    column.name = args.name;
    column.order = args.order;
    column.item = Promise.resolve(item);

    await this.incrementOrder(MenuColumn, args.order);

    return this.entityManager.save(column);
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(true, false)
  public async deleteColumn({ id }: Identifier) {
    await this.entityManager.update(MenuColumn, id, {
      deleted: true
    });

    return true;
  }

  @Mutation()
  @Validate<ColumnUpdate>((obj) => {
    return !obj.input.name || isLength(obj.input.name, 1, 255);
  })
  @Authenticated(true)
  public async updateColumn(args: ColumnUpdate) {
    const column = await this.entityManager.findOne(MenuColumn, { id: args.id, deleted: false });

    if (!column) {
      return null;
    } else if (args.input.order !== undefined) {
      await this.updateOrder(MenuColumn, column.order, args.input.order);
    }

    return this.entityManager.save(updateObject(column, args.input));
  }

  @Mutation()
  @Validate<TargetCreate>((obj) => {
    return isUUID(obj.target, 4);
  })
  @Authenticated(true)
  public async createTarget(args: TargetCreate) {
    const column = await this.entityManager.findOne(MenuColumn, { id: args.id, deleted: false });
    const page = await this.entityManager.findOne(Page, { id: args.target, deleted: false });

    if (!column || !page) {
      return null;
    }

    const target = new MenuTarget();
    target.target = Promise.resolve(page);
    target.order = args.order;
    target.column = Promise.resolve(column);

    await this.incrementOrder(MenuTarget, args.order);

    return this.entityManager.save(target);
  }

  @Mutation()
  @Validate(undefined, false)
  @Authenticated(true, false)
  public async deleteTarget({ id }: Identifier) {
    await this.entityManager.update(MenuTarget, id, {
      deleted: true
    });

    return true;
  }

  @Mutation()
  @Validate<TargetUpdate>((obj) => {
    return !obj.input.target || isUUID(obj.input.target, 4);
  })
  @Authenticated(true)
  public async updateTarget(args: TargetUpdate) {
    const target = await this.entityManager.findOne(MenuTarget, { id: args.id, deleted: false });

    if (!target) {
      return null;
    } else if (args.input.order !== undefined) {
      await this.updateOrder(MenuTarget, target.order, args.input.order);
    }

    if (args.input.target) {
      const page = await this.entityManager.findOne(Page, { id: args.input.target, deleted: false });

      if (!page) {
        return null;
      }

      target.target = Promise.resolve(page);
    }

    return this.entityManager.save(updateObject(target, { order: args.input.order }));
  }

  private async incrementOrder(entity: ObjectType<{ order: number }>, order: number) {
    await this.entityManager.increment(entity, { order: Not(LessThan(order)) }, 'order', 1);
  }

  private async updateOrder(entity: ObjectType<{ order: number }>, current: number, updated: number) {
    const count = await this.entityManager.count(entity);

    updated = Math.max(0, Math.min(count - 1, updated));

    if (updated > current) {
      await this.entityManager.createQueryBuilder()
        .update(entity)
        .where('order > :old and order <= :new', { old: current, new: updated })
        .set({ order: () => '"order" - 1' })
        .execute();
    } else if (updated < current) {
      await this.entityManager.createQueryBuilder()
        .update(entity)
        .where('order < :old and order >= :new', { old: current, new: updated })
        .set({ order: () => '"order" + 1' })
        .execute();
    }
  }
}
