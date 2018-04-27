import { ComponentClass, createElement } from 'react';

import { ContentBlockTypes } from '../api/ContentBlock';
import { BLOCK_RENDERERS } from '../constants';
import { ContentBlockRenderer, RendererProps } from '../types';
import { findByKey } from './findByKey';

export const createRenderer = <T extends keyof ContentBlockTypes>(
  component: ComponentClass<RendererProps<T>>): ContentBlockRenderer<T> => (block, drop = () => undefined) => {
  const children = block.children.map((child) => {
    const renderer = findByKey(child.type, BLOCK_RENDERERS);

    return {
      data: child.parent_data || 0,
      order: child.order,
      render: () => renderer(child, drop)
    };
  });

  return createElement(component, {
    key: block.id,
    data: block.data,
    drop,
    children
  });
};
