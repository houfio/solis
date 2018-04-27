import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

export const hero = createRenderer(class extends Component<RendererProps<'hero'>> {
  public render() {
    const { data: { image, alignment, height }, drop, children } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: alignment === 0 ? 'flex-start' : alignment === 1 ? 'center' : 'flex-end',
        backgroundImage: `url("${image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `${height}px`
      },
    });

    return (
      <div className={css(styleSheet.hero)}>
        {children
          .sort((a, b) => a.data - b.data)
          .map((child) => (
            child.render()
          ))}
        {drop(children.length)}
      </div>
    );
  }
});
