import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { WHITE } from '../constants';
import { HamburgerConsumer } from '../context/hamburger';

export const Hamburger = () => (
  <HamburgerConsumer>
    {({ hovering }, { setHovering }) => {
      const bar = {
        display: 'block',
        width: '1.5rem',
        height: '4px',
        borderRadius: '4px',
        backgroundColor: WHITE,
        transition: 'all .2s ease'
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
          '::before': {
            content: '""',
            marginTop: hovering ? '-.6rem' : '-.5rem',
            ...bar
          },
          '::after': {
            content: '""',
            marginTop: hovering ? '.95rem' : '.75rem',
            ...bar
          }
        }
      } as any);

      return (
        <div
          className={css(stylesheet.hamburger)}
          onMouseEnter={setHovering.e(true)}
          onMouseLeave={setHovering.e(false)}
        >
          <div className={css(stylesheet.inner)}/>
        </div>
      );
    }}
  </HamburgerConsumer>
);
