import { Identifier } from './Identifier';

export type TagCreate = Identifier & {
  id: string,
  tag: string
};
