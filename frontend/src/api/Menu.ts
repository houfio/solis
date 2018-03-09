import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';

export type Menu = Identifiable & {
  name: string,
  items: MenuItem[]
}

export type MenuItem = Identifiable & Hidable & {
  page_id: number,
  columns: {
    name: string,
    items: number[]
  }[]
}
