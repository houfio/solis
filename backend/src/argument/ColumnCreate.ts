import { IsUUID, MaxLength } from 'class-validator';

export class ColumnCreate {
  @IsUUID('4')
  public item!: string;

  @MaxLength(255)
  public name!: string;

  public order!: number;
}
