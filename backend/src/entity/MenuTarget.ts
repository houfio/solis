import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MenuColumn } from './MenuColumn';
import { Page } from './Page';

@Entity()
export class MenuTarget {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => MenuColumn, (column) => column.targets)
  public column!: Promise<MenuColumn>;

  @ManyToOne(() => Page)
  public target!: Promise<Page>;

  @Column()
  public order!: number;

  @Column({ default: false })
  public deleted!: boolean;
}
