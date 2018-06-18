import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MenuColumn } from './MenuColumn';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @OneToMany(() => MenuColumn, (column) => column.item)
  public columns!: Promise<MenuColumn[]>;

  @Column()
  public name!: string;

  @Column()
  public order!: number;

  @Column()
  public hidden!: boolean;

  @Column({ default: false })
  public deleted!: boolean;
}
