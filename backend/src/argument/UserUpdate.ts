import { Identifier } from './Identifier';

type UserUpdateInput = {
  email?: string
};

export type UserUpdate = Identifier & {
  input: UserUpdateInput
};
