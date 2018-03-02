import { ComponentClass, createElement } from 'react';

import { ContentBlockTypes, ContentBlock } from '../api/ContentBlock';
import { findRenderer } from './findRenderer';
import { RendererProps } from '../types';

export const createRenderer = <T extends keyof ContentBlockTypes>(component: ComponentClass<RendererProps<T>>) =>
  (block: ContentBlock<T>, key: number) => {
    const children = block.children.map((child, index) => {
      const renderer = findRenderer(child) || (() => '');

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
