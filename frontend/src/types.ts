import { ReactNode } from 'react';

import { BREAKPOINTS } from './constants';
import {
  ContentPageQuery_page_blocks,
  ContentPageQuery_page_blocks_data
} from './schema/__generated__/ContentPageQuery';

export type ColorType = 'primary' | 'secondary' | 'tertiary';

export type HeadingType = 'bold' | 'thin' | 'subtle';

export type PageGuardType = 'auth' | 'no_auth';

export type Breakpoint = keyof typeof BREAKPOINTS;

export type RendererProps<T extends ContentPageQuery_page_blocks_data> = {
  data: T,
  children: RenderChild[],
  drop: (data?: number) => ReactNode | undefined
};

export type RenderChild = {
  data: number,
  render: () => ReactNode
};

export type ContentBlockRenderer = (
  block: ContentPageQuery_page_blocks,
  children?: ContentPageQuery_page_blocks[],
  drop?: (data?: number) => ReactNode | undefined
) => ReactNode;

export type Push = (location: string) => void;
