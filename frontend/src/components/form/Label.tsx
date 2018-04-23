import { css, StyleSheet } from 'aphrodite/no-important';
import { ReactNode } from 'react';
import * as React from 'react';

type Props = {
  label: string,
  name: string,
  children: ReactNode
};

export const Label = ({ label, name, children }: Props) => {
  const styleSheet = StyleSheet.create({
    label: {
      display: 'flex',
      position: 'relative',
      padding: '0 1rem',
      height: '2.5rem',
      border: 'none',
      borderRadius: '2.5rem',
      backgroundColor: '#fff',
      marginBottom: '1rem',
      maxWidth: '50rem',
      overflow: 'hidden'
    },
    text: {
      position: 'relative',
      color: '#414756',
      paddingRight: '1.5rem',
      opacity: .5,
      alignSelf: 'center',
      '::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '2px',
        height: '1rem',
        top: '2px',
        right: '.7rem',
        backgroundColor: '#414756',
        opacity: .5
      }
    }
  });

  return (
    <div className={css(styleSheet.label)}>
      <label className={css(styleSheet.text)} htmlFor={name}>{label}</label>
      {children}
    </div>
  );
};
