import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { ContentPageQuery_page_blocks_data_Text } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

export const text = createRenderer(class extends Component<RendererProps<ContentPageQuery_page_blocks_data_Text>> {
  public render() {
    const { data: { text, type } } = this.props;

    const styleSheet = StyleSheet.create({
      light: {
        color: '#FFFFFF'
      }
    });

    return (
      <div className={css(type === 1 && styleSheet.light)}>
        {text}
      </div>
    );
  }
});
