import { Hidable } from './Hidable';
import { Identifiable } from './Identifiable';

export type ContentBlock<T extends keyof ContentBlockTypes = any> = Identifiable & Hidable & {
  page_id?: number,
  parent_data?: number,
  type: T,
  order: number,
  children: ContentBlock[],
  data: ContentBlockTypes[T]
};

export type ContentBlockTypes = {
  text: {
    text: string,
    mode: number
  },
  button: {
    text: string,
    type: number,
    target: number
  },
  column: {
    size: number,
    breakpoint: number
  },
  hero: {
    image: string,
    alignment: number,
    height: number
  }
};
