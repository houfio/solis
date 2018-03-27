import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps } from '../types';
import { Container } from '../components/Container';

export const hero = createRenderer(class extends Component<RendererProps<'hero'>> {
  public render() {
    const { data: { image, alignment, height }, children } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        position: 'absolute',
        left: 0,
        width: '100%',
        backgroundImage: `url("${image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: alignment === 0 ? 'flex-start' : alignment === 1 ? 'center' : 'flex-end',
        height: `${height}px`
      }
    });

    return (
      <div className={css(styleSheet.hero)}>
        <Container styles={[styleSheet.container]}>
          {children
            .sort((a, b) => a.order - b.order)
            .map(child => (
              child.render()
            ))}
        </Container>
      </div>
    );
  }
});
