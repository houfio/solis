import { Identifier } from './Identifier';

export type ColumnCreate = Identifier & {
  name: string,
  order: number
};
