import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';
import { Draftable } from './Draftable';

export type Menu = Identifiable & {
  name: string,
  items: MenuItem[]
}

export type MenuItem = Identifiable & Hidable & Draftable & {
  name: string,
  columns: MenuColumn[]
}

export type MenuColumn = Identifiable & {
  name: string,
  targets: MenuTarget[]
}

export type MenuTarget = Identifiable & {
  target: number
}
