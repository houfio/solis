import { Identifier } from './Identifier';

type TargetUpdateInput = {
  target?: string,
  order?: number
};

export type TargetUpdate = Identifier & {
  input: TargetUpdateInput
};
