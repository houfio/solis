import { Identifier } from './Identifier';

type BlockUpdateInput = {
  parent?: string,
  parentData?: number,
  order?: number,
  data?: string
};

export type BlockUpdate = Identifier & {
  input: BlockUpdateInput
};
