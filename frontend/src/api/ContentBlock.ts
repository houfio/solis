import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';
import { ButtonTypes } from '../types';
import { BREAKPOINTS } from '../constants';

export type ContentBlock<T extends keyof ContentBlockTypes = any> = Identifiable & Hidable & {
  page_id?: number,
  parent_data?: number,
  type: T,
  order: number,
  children: ContentBlock[],
  data: ContentBlockTypes[T]
}

export type ContentBlockTypes = {
  text: {
    text: string
  },
  button: {
    text: string,
    type: ButtonTypes,
    target: number
  },
  column: {
    size: number,
    breakpoint: keyof typeof BREAKPOINTS;
  },
  hero: {
    image: string,
    alignment: number,
    height: number,
    dark: boolean
  }
}
