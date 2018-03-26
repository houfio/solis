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
  text: Identifiable & {
    text: string
  },
  button: Identifiable & {
    text: string,
    type: ButtonTypes,
    target: number
  },
  column: Identifiable & {
    size: number,
    breakpoint: keyof typeof BREAKPOINTS;
  },
  hero: Identifiable & {
    image: string,
    alignment: number,
    height: number,
    dark: boolean
  }
}
