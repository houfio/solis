import { Identifier } from './Identifier';

export type TargetCreate = Identifier & {
  target: string,
  order: number
};
