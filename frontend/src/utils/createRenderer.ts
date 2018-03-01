import { ReactNode } from 'react';

import { ContentBlockTypes, ContentBlock } from '../api/ContentBlock';
import { findRenderer } from './findRenderer';
import { ContentBlockChild } from '../types';

export const createRenderer =
  <T extends keyof ContentBlockTypes>(render: (key: number,
                                               data: ContentBlockTypes[T],
                                               children: ContentBlockChild[]) => ReactNode) =>
    (block: ContentBlock<T>, key: number) => {
      const children = block.children.map((child, index) => {
        const renderer = findRenderer(child) || (() => '');

        return {
          data: child.parent_data || 0,
          render: () => renderer(child, index)
        };
      });

      return render(key, block.data, children);
    };
