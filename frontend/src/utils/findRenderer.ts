import { ContentBlockTypes, ContentBlock } from '../api/ContentBlock';
import { ContentBlockRenderer } from '../types';
import { BLOCK_RENDERERS } from '../constants';

export const findRenderer =
  <T extends keyof ContentBlockTypes>(block: ContentBlock<T>): ContentBlockRenderer<T> | undefined => {
  for (let renderer in BLOCK_RENDERERS) {
    if (BLOCK_RENDERERS.hasOwnProperty(renderer) && block.type === renderer) {
      return (BLOCK_RENDERERS as any)[renderer];
    }
  }

  return;
};
