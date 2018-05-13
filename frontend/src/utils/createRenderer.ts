import { ComponentClass, createElement } from 'react';

import { ContentPageQuery_page_blocks_data } from '../schema/__generated__/ContentPageQuery';
import { ContentBlockRenderer, RendererProps } from '../types';

export const createRenderer = <T extends ContentPageQuery_page_blocks_data>(
  component: ComponentClass<RendererProps<T>>
): ContentBlockRenderer => (block, drop = () => undefined) => {
  return createElement(component, {
    key: block.id,
    data: block.data as T,
    drop
  });
};
