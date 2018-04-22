import { css, CSSProperties, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { ButtonTypes } from '../types';

type Props = {
  text: string,
  type?: ButtonTypes,
  onClick?: () => void,
  styles?: StyleDeclaration
};

const buttonStyles: { [T in ButtonTypes]: CSSProperties } = {
  primary: {
    backgroundColor: '#1976D2',
    ':hover': {
      backgroundColor: '#12589D'
    }
  },
  secondary: {
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
      padding: '.75rem',
      color: '#fff',
      cursor: 'pointer',
      borderRadius: '.5rem',
      transition: 'background-color .2s ease',
      ...buttonStyles[type]
    }
  });

  return (
    <span className={css(styleSheet.button, styles)} onClick={onClick}>{text}</span>
  );
};
