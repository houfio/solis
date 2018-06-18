import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BlogTag } from './BlogTag';
import { User } from './User';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => User, (user) => user.posts)
  public author!: Promise<User>;

  @OneToMany(() => BlogTag, (tag) => tag.post)
  public tags!: Promise<BlogTag[]>;

  @Column()
  public title!: string;

  @Column({ type: 'text' })
  public content!: string;

  @Column()
  public creationDate!: Date;

  @Column({ default: false })
  public deleted!: boolean;
}
