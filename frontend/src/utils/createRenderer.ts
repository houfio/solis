import { ComponentClass, createElement } from 'react';

import { BLOCK_RENDERERS } from '../constants';
import { ContentPageQuery_page_blocks_data } from '../schema/__generated__/ContentPageQuery';
import { ContentBlockRenderer, RendererProps } from '../types';
import { findByKey } from './findByKey';

export const createRenderer = <T extends ContentPageQuery_page_blocks_data>(
  component: ComponentClass<RendererProps<T>>
): ContentBlockRenderer => (block, children = [], drop = () => undefined) => {
  const c = children.map((child) => {
    const renderer = findByKey(child.type, BLOCK_RENDERERS);

    return {
      data: child.parentData || 0,
      render: () => renderer(child)
    };
  });

  return createElement(component, {
    key: block.id,
    data: block.data as T,
    children: c,
    drop
  });
};
