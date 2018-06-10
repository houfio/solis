import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PageBlock } from './PageBlock';
import { PageGuard } from './PageGuard';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @OneToMany(() => PageGuard, (guard) => guard.page)
  public guards!: Promise<PageGuard[]>;

  @OneToMany(() => PageBlock, (block) => block.page)
  public blocks!: Promise<PageBlock[]>;

  @Column()
  public name!: string;

  @Column()
  public path!: string;

  @Column({ nullable: true })
  public type?: string;

  @Column()
  public hidden!: boolean;

  @Column({ default: false })
  public deleted!: boolean;
}
