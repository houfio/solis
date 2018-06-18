import { Identifier } from './Identifier';

export type BlockCreate = Identifier & {
  type: string,
  parent?: string,
  parentData?: number,
  order?: number,
  data: string
};
