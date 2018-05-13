import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Page } from './Page';
import { PageBlock } from './PageBlock';

@Entity()
export class PageBlockData {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @JoinColumn()
  @OneToOne(() => PageBlock, (block) => block.data)
  public block!: Promise<PageBlock | undefined>;

  @ManyToOne(() => Page, { nullable: true })
  public target?: number;

  @Column({ nullable: true })
  public text?: string;

  @Column({ nullable: true })
  public type?: number;

  @Column({ nullable: true })
  public size?: number;

  @Column({ nullable: true })
  public breakpoint?: number;

  @Column({ nullable: true })
  public image?: string;

  @Column({ nullable: true })
  public height?: number;
}
