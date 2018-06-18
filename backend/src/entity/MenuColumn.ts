import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MenuItem } from './MenuItem';
import { MenuTarget } from './MenuTarget';

@Entity()
export class MenuColumn {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => MenuItem, (item) => item.columns)
  public item!: Promise<MenuItem>;

  @OneToMany(() => MenuTarget, (target) => target.column)
  public targets!: Promise<MenuTarget[]>;

  @Column()
  public name!: string;

  @Column()
  public order!: number;

  @Column({ default: false })
  public deleted!: boolean;
}
