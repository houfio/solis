import { MaxLength } from 'class-validator';

export class PostCreate {
  @MaxLength(255)
  public title!: string;

  public content!: string;

  public tags!: string[];
}
