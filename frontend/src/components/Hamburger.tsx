import { css, CSSProperties, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

type Props = {
  active: boolean,
  onToggle: () => void,
  styles?: StyleDeclaration
};

export const Hamburger = ({ active, onToggle, styles = [] }: Props) => {
  const bar: CSSProperties = {
    display: 'block',
    width: '1.5rem',
    height: '4px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, .9)',
    transition: active ?
      'margin-top .1s ease, transform .1s ease .1s' :
      'margin-top .1s ease .1s, transform .2s ease'
  };

  const stylesheet = StyleSheet.create({
    hamburger: {
      display: 'flex',
      alignItems: 'center',
      width: '1.5rem',
      height: '1.5rem',
      ':hover': {
        cursor: 'pointer'
      }
    },
    inner: {
      ...bar,
      backgroundColor: active ? 'transparent' : 'rgba(255, 255, 255, .9)',
      transition: 'opacity .1s ease, background-color 0s linear .1s',
      '::before': {
        content: '""',
        transform: active ? 'rotate(45deg)' : '',
        marginTop: active ? '0' : '-8px',
        ...bar
      },
      '::after': {
        content: '""',
        transform: active ? 'rotate(-45deg)' : '',
        marginTop: active ? '-4px' : '12px',
        ...bar
      }
    }
  });

  return (
    <div className={css(stylesheet.hamburger, styles)} onClick={onToggle}>
      <div className={css(stylesheet.inner)}/>
    </div>
  );
};
