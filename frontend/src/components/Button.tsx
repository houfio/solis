import { css, CSSProperties, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { ColorType } from '../types';

type Props = {
  text: string,
  type?: ColorType,
  onClick?: () => void,
  styles?: StyleDeclaration
};

const buttonStyles: { [T in ColorType]: CSSProperties } = {
  primary: {
    color: '#fff',
    backgroundColor: '#1976d2',
    ':hover': {
      backgroundColor: '#12589d'
    }
  },
  secondary: {
    color: '#fff',
    backgroundColor: '#414756',
    ':hover': {
      backgroundColor: '#303540'
    }
  },
  tertiary: {
    color: '#303540',
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#eee'
    }
  }
};

export const Button = ({ text, type = 'primary', onClick, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    button: {
      display: 'inline-block',
      padding: '.75rem 1rem',
      cursor: 'pointer',
      borderRadius: '2.5rem',
      transition: 'background-color .2s ease',
      ...buttonStyles[type]
    }
  });

  return (
    <span className={css(styleSheet.button, styles)} onClick={onClick}>{text}</span>
  );
};
