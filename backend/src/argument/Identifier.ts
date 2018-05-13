import { IsUUID } from 'class-validator';

export class Identifier {
  @IsUUID('4')
  public id!: string;
}
