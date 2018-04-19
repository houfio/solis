import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet, OpenCSSProperties } from 'aphrodite/no-important';

import { ButtonTypes } from '../types';

type Props = {
  text: string,
  type?: ButtonTypes,
  onClick?: () => void,
  styles?: (CSSProperties | false)[]
}

const buttonStyles: { [T in ButtonTypes]: OpenCSSProperties } = {
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
  }
};

export const Button = ({ text, type = 'primary', onClick, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    button: {
      display: 'inline-block',
      padding: '.75rem',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '.25rem',
      transition: 'background-color .2s ease',
      ...buttonStyles[type]
    }
  });

  return (
    <span className={css(styleSheet.button, styles)} onClick={onClick}>{text}</span>
  );
};
