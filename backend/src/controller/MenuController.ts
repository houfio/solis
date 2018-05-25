import { Inject } from 'typedi';
import { EntityManager, LessThan, Not, ObjectType } from 'typeorm';
import { isLength, isUUID } from 'validator';
import { Controller, Mutation, Query } from 'vesper';

import { ColumnCreate } from '../argument/ColumnCreate';
import { ItemCreate } from '../argument/ItemCreate';
import { TargetCreate } from '../argument/TargetCreate';
import { Admin } from '../decorator/Admin';
import { Validate } from '../decorator/Validate';
import { MenuColumn } from '../entity/MenuColumn';
import { MenuItem } from '../entity/MenuItem';
import { MenuTarget } from '../entity/MenuTarget';
import { Page } from '../entity/Page';

@Controller()
export class MenuController {
  @Inject()
  private entityManager!: EntityManager;

  @Query()
  public menu() {
    return this.entityManager.find(MenuItem);
  }

  @Mutation()
  @Validate<ItemCreate>((obj) => {
    return isLength(obj.name, 1, 255);
  })
  @Admin()
  public async createItem(args: ItemCreate) {
    const item = new MenuItem();
    item.name = args.name;
    item.order = args.order;
    item.hidden = args.hidden;

    await this.incrementOrder(MenuItem, args.order);

    return this.entityManager.save(item);
  }

  @Mutation()
  @Validate<ColumnCreate>((obj) => {
    return isLength(obj.name, 1, 255);
  })
  @Admin()
  public async createColumn(args: ColumnCreate) {
    const item = await this.entityManager.findOneOrFail(MenuItem, args.id);
    const column = new MenuColumn();
    column.name = args.name;
    column.order = args.order;
    column.item = Promise.resolve(item);

    await this.incrementOrder(MenuColumn, args.order);

    return this.entityManager.save(column);
  }

  @Mutation()
  @Validate<TargetCreate>((obj) => {
    return isUUID(obj.target, 4);
  })
  @Admin()
  public async createTarget(args: TargetCreate) {
    const column = await this.entityManager.findOneOrFail(MenuColumn, args.id);
    const t = await this.entityManager.findOneOrFail(Page, args.target);
    const target = new MenuTarget();
    target.target = Promise.resolve(t);
    target.order = args.order;
    target.column = Promise.resolve(column);

    await this.incrementOrder(MenuTarget, args.order);

    return this.entityManager.save(target);
  }

  private async incrementOrder(entity: ObjectType<{ order: number }>, order: number) {
    await this.entityManager.increment(entity, { order: Not(LessThan(order)) }, 'order', 1);
  }
}
