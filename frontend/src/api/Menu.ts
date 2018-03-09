import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';

export type Menu = Identifiable & {
  name: string,
  items: MenuItem[]
}

export type MenuItem = Identifiable & Hidable & {
  target: number,
  columns: {
    name: string,
    targets: number[]
  }[]
}
