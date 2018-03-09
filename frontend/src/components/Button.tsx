import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { ButtonTypes } from '../types';

type Props = {
  text: string,
  type?: ButtonTypes,
  onClick?: () => void
}

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
  }
};

export const Button = ({ text, type = 'primary', onClick }: Props) => {
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
    <span className={css(styleSheet.button)} onClick={onClick}>{text}</span>
  );
};
