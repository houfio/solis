import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { ContentPageQuery_page_blocks_data_Hero } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

export const hero = createRenderer(class extends Component<RendererProps<ContentPageQuery_page_blocks_data_Hero>> {
  public render() {
    const { data: { image, type, height } } = this.props;

    const styleSheet = StyleSheet.create({
      wrapper: {
        height: `${height}px`
      },
      hero: {
        position: 'absolute',
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: type === 0 ? 'flex-start' : type === 1 ? 'center' : 'flex-end',
        backgroundImage: `url("${image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: `${height}px`
      },
    });

    return (
     <div className={css(styleSheet.wrapper)}>
       <div className={css(styleSheet.hero)}>
         {/*{children
          .sort((a, b) => a.data - b.data)
          .map((child) => (
            child.render()
          ))}
        {drop(children.length)}*/}
       </div>
     </div>
    );
  }
});
