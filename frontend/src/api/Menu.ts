import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';

export type Menu = Identifiable & {
  name: string,
  items: MenuItem[]
}

export type MenuItem = Identifiable & Hidable & {
  name: string,
  columns: MenuColumn[]
}

export type MenuColumn = {
  name: string,
  targets: number[]
}
