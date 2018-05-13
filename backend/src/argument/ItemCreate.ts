import { MaxLength } from 'class-validator';

export class ItemCreate {
  @MaxLength(255)
  public name!: string;

  public order!: number;

  public hidden!: boolean;
}
