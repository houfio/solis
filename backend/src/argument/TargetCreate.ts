import { IsUUID } from 'class-validator';

export class TargetCreate {
  @IsUUID('4')
  public column!: string;

  public target!: number;

  public order!: number;
}
