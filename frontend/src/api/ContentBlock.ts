import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';
import { ButtonTypes } from '../types';
import { BREAKPOINTS } from '../constants';

export type ContentBlock<T extends keyof ContentBlockTypes = any> = Identifiable & Hidable & {
  page_id?: number,
  parent?: ContentBlockParent,
  type: T,
  children: ContentBlock[],
  data: ContentBlockTypes[T]
}

export type ContentBlockParent = Identifiable & {
  data: number
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
  }
}
