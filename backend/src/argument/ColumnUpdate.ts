import { Identifier } from './Identifier';

type ColumnUpdateInput = {
  name?: string,
  order?: number
};

export type ColumnUpdate = Identifier & {
  input: ColumnUpdateInput
};
