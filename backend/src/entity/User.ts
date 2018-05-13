import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BlogPost } from './BlogPost';
import { ContactData } from './ContactData';
import { Token } from './Token';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @OneToOne(() => ContactData, (contact) => contact.user)
  public contactData!: Promise<ContactData | undefined>;

  @OneToMany(() => Token, (token) => token.user)
  public tokens!: Promise<Token[]>;

  @OneToMany(() => BlogPost, (post) => post.author)
  public posts!: Promise<BlogPost[]>;

  @Column({ default: false })
  public admin!: boolean;

  @Column({ unique: true })
  public membershipId!: number;

  @Column({ length: 128 })
  public membershipSection!: string;

  @Column({ unique: true })
  public email!: string;

  @Column({ length: 60 })
  public password!: string;

  @Column()
  public creationDate!: Date;

  @Column({ default: false })
  public approved!: boolean;

  @Column({ default: false })
  public deleted!: boolean;
}
