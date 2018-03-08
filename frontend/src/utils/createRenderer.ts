import { ComponentClass, createElement } from 'react';

import { ContentBlockTypes, ContentBlock } from '../api/ContentBlock';
import { findByKey } from './findByKey';
import { RendererProps } from '../types';
import { BLOCK_RENDERERS } from '../constants';

export const createRenderer = <T extends keyof ContentBlockTypes>(component: ComponentClass<RendererProps<T>>) =>
  (block: ContentBlock<T>, key: number) => {
    const children = block.children.map((child, index) => {
      const renderer = findByKey(child.type, BLOCK_RENDERERS);

      return {
        data: child.parent_data || 0,
        render: () => renderer(child, index)
      };
    });

    return createElement(component, {
      key,
      data: block.data,
      children
    });
  };
