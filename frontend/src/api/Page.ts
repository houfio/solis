import { Hidable } from './Hidable';
import { Identifiable } from './Identifiable';

export type Page = Identifiable & Hidable & {
  name: string,
  path: string,
  type?: 'home',
  guards: PageGuard[]
};

export type PageGuardTypes = 'auth' | 'no_auth';

export type PageGuard = Identifiable & {
  type: PageGuardTypes,
  target: number
};
