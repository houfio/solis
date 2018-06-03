import { css, CSSProperties, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { BLACK, BLUE, BLUE_ACCENT, DARK_BLUE, DARK_BLUE_ACCENT, DARK_GRAY, GRAY, WHITE } from '../constants';
import { ColorType } from '../types';

type Props = {
  text: string,
  type?: ColorType,
  onClick?: () => void,
  styles?: StyleDeclaration
};

const styleSheet = StyleSheet.create({
  button: {
    display: 'inline-block',
    padding: '.75rem 1rem',
    cursor: 'pointer',
    borderRadius: '2.5rem',
    transition: 'background-color .2s ease'
  },
  ...{
    primary: {
      color: WHITE,
      backgroundColor: BLUE,
      ':hover': {
        backgroundColor: BLUE_ACCENT
      }
    },
    secondary: {
      color: WHITE,
      backgroundColor: DARK_BLUE,
      ':hover': {
        backgroundColor: DARK_BLUE_ACCENT
      }
    },
    tertiary: {
      color: BLACK,
      backgroundColor: GRAY,
      ':hover': {
        backgroundColor: DARK_GRAY
      }
    }
  } as { [T in ColorType]: CSSProperties }
});

export const Button = ({ text, type = 'primary', onClick, styles = [] }: Props) => (
  <span className={css(styleSheet.button, styleSheet[ type ], styles)} onClick={onClick}>{text}</span>
);
