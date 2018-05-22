import { MaxLength, ValidateNested } from 'class-validator';

import { Identifier } from './Identifier';

class PostUpdateInput {
  @MaxLength(255)
  public title?: string;

  public content?: string;
}

export class PostUpdate extends Identifier {
  @ValidateNested()
  public input!: PostUpdateInput;
}
