import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(() => User, (user) => user.tokens)
  public user!: Promise<User>;

  @Column()
  public creationDate!: Date;

  @Column()
  public userAgent!: string;

  @Column()
  public ipAddress!: string;

  @Column({ nullable: true })
  public lastUsed?: Date;

  @Column({ default: false })
  public deleted!: boolean;
}
