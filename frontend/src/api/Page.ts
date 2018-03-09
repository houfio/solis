import { Identifiable } from './Identifiable';
import { RouteGuard } from './RouteGuard';
import { Hidable } from './Hidable';

export type Page = Identifiable & Hidable & {
  name: string,
  path: string,
  guards: RouteGuard[],
  type?: 'home'
};
