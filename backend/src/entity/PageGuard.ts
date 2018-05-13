import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Page } from './Page';

@Entity()
export class PageGuard {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => Page, (page) => page.guards)
  public page!: Promise<Page>;

  @ManyToOne(() => Page)
  public target!: number;

  @Column()
  public type!: string;
}
