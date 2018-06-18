import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BlogPost } from './BlogPost';

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => BlogPost, (post) => post.tags)
  public post!: Promise<BlogPost>;

  @Column()
  public tag!: string;

  @Column({ default: false })
  public deleted!: boolean;
}
