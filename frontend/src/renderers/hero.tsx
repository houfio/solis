import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { Container } from '../components/Container';
import { ContentPageQuery_page_blocks_data_Hero } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

type Props = RendererProps<ContentPageQuery_page_blocks_data_Hero>;

export const hero = createRenderer(({ data: { image, type, height }, children, drop }: Props) => {
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
    }
  });

  return (
    <div className={css(styleSheet.wrapper)}>
      <div className={css(styleSheet.hero)}>
        <Container>
          {children
            .sort((a, b) => a.data - b.data)
            .map((child) => (
              child.render()
            ))}
          {drop(children.length)}
        </Container>
      </div>
    </div>
  );
});
