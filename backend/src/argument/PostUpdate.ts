import { Identifier } from './Identifier';

type PostUpdateInput = {
  title?: string,
  content?: string
};

export type PostUpdate = Identifier & {
  input: PostUpdateInput
};
