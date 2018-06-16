import { Identifier } from './Identifier';

type PageUpdateInput = {
  name?: string,
  path?: string,
  type?: string,
  hidden?: boolean
};

export type PageUpdate = Identifier & {
  input: PageUpdateInput
};
