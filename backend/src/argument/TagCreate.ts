import { IsUUID, MaxLength } from 'class-validator';

export class TagCreate {
  @IsUUID('4')
  public id!: string;

  @MaxLength(32)
  public tag!: string;
}
