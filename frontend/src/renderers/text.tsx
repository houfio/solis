import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { WHITE } from '../constants';
import { ContentPageQuery_page_blocks_data_Text } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

type Props = RendererProps<ContentPageQuery_page_blocks_data_Text>;

export const text = createRenderer(({ data: { text, type } }: Props) => {
  const styleSheet = StyleSheet.create({
    light: {
      color: WHITE
    }
  });

  return (
    <div className={css(type === 1 && styleSheet.light)}>
      {text}
    </div>
  );
});
