import { css, CSSProperties, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

type Props = {
  onClick: () => void,
  styles?: StyleDeclaration
};

const bar: CSSProperties = {
  content: '""',
  display: 'block',
  width: '1rem',
  height: '4px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, .9)'
};

const styleSheet = StyleSheet.create({
  arrow: {
    width: '1rem',
    height: '1.5rem',
    cursor: 'pointer',
  },
  inner: {
    '::before': {
      ...bar,
      transform: 'translateY(.3rem) rotate(-45deg)'
    },
    '::after': {
      ...bar,
      transform: 'translateY(.6rem) rotate(45deg)'
    }
  }
});

export const Arrow = ({ onClick, styles = [] }: Props) => (
  <div className={css(styleSheet.arrow, styles)} onClick={onClick}>
    <div className={css(styleSheet.inner)}/>
  </div>
);
