import { Identifiable } from './Identifiable';
import { RouteGuards } from './RouteGuard';
import { Hidable } from './Hidable';

export type Page = Identifiable & Hidable & {
  name: string,
  path: string,
  guards: RouteGuards,
  type?: 'home'
};
