import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class ContactData {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @JoinColumn()
  @OneToOne(() => User, (user) => user.contactData, { nullable: true })
  public user!: Promise<User | undefined>;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column({ length: 16 })
  public zipCode!: string;

  @Column({ length: 8 })
  public houseNumber!: string;
}
