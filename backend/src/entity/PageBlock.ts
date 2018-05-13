import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Page } from './Page';
import { PageBlockData } from './PageBlockData';

@Entity()
export class PageBlock {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => Page, (page) => page.blocks)
  public page!: Promise<Page>;

  @OneToOne(() => PageBlockData, (data) => data.block)
  public data!: Promise<PageBlockData>;

  @ManyToOne(() => PageBlock, { nullable: true })
  public parent!: Promise<PageBlock | undefined>;

  @Column()
  public type!: string;

  @Column({ nullable: true })
  public order?: number;

  @Column({ nullable: true })
  public parentData?: number;

  @Column()
  public hidden!: boolean;
}
