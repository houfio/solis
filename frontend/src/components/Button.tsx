import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { ButtonTypes } from '../types';

type Props = {
  text: string,
  type?: ButtonTypes,
  onClick?: () => void
}

export const Button = ({ text, type = 'primary', onClick }: Props) => {
  const styleSheet = StyleSheet.create({
    button: {
      padding: '1rem',
      color: 'white',
      cursor: 'default',
      transition: 'background-color .2s ease'
    },
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
  });

  return (
    <span
      className={css(
        styleSheet.button,
        type === 'primary' && styleSheet.primary,
        type === 'secondary' && styleSheet.secondary
      )}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
