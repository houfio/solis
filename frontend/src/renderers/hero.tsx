import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps } from '../types';
import { Container } from '../components/Container';

export const hero = createRenderer(class extends Component<RendererProps<'hero'>> {
  public render() {
    const { data: { image, height, dark } } = this.props;

    const styleSheet = StyleSheet.create({
      hero: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: `${height}px`,
        backgroundImage: `url("${image}")`,
        color: dark ? 'black' : 'white'
      }
    });

    return (
      <div className={css(styleSheet.hero)}>
        <Container>
          hero
        </Container>
      </div>
    );
  }
});
