import { Identifiable } from './Identifiable';
import { RouteGuard } from './RouteGuard';
import { Hidable } from './Hidable';
import { Draftable } from './Draftable';

export type Page = Identifiable & Hidable & Draftable & {
  name: string,
  path: string,
  guards: RouteGuard[],
  type?: 'home'
};
