import { Inject } from 'typedi';
import { EntityManager } from 'typeorm';
import { Controller, Query } from 'vesper';

import { Identifier } from '../argument/Identifier';
import { Validate } from '../decorator/Validate';
import { Page } from '../entity/Page';

@Controller()
export class PageController {
  @Inject()
  private entityManager!: EntityManager;

  @Query()
  public pages() {
    return this.entityManager.find(Page);
  }

  @Query()
  @Validate()
  public page({ id }: Identifier) {
    return this.entityManager.findOne(Page, id);
  }
}
