import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';
import { ButtonTypes } from '../types';

export type ContentBlockTypes = {
  text: {
    text: string
  },
  button: {
    text: string,
    type: ButtonTypes
  },
  column: {}
}

export type ContentBlock<T extends keyof ContentBlockTypes = any> = Identifiable & Hidable & {
  page_id?: number,
  type: T,
  data: ContentBlockTypes[T],
  children: ContentBlock[],
  parent_data?: number
}
