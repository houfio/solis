import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';
import { ButtonTypes } from '../types';
import { BREAKPOINTS } from '../constants';

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
  }
}

export type ContentBlock<T extends keyof ContentBlockTypes = any> = Identifiable & Hidable & {
  page_id?: number,
  type: T,
  data: ContentBlockTypes[T],
  children: ContentBlock[],
  parent_data?: number
}
