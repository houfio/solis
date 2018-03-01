import { Identifiable } from './Identifiable';
import { Hidable } from './Hidable';

export type ContentBlockTypes = {
  text: {
    text: string
  },
  button: {
    text: string,
    type: 'primary' | 'secondary'
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
