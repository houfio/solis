import { Identifier } from './Identifier';

type ItemUpdateInput = {
  name?: string,
  order?: number,
  hidden?: boolean
};

export type ItemUpdate = Identifier & {
  input: ItemUpdateInput
};
