import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { BLUE, WHITE } from '../constants';

export const Spinner = () => {
  const rotate = {
    from: {
      transform: 'rotate(0)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  };

  const styleSheet = StyleSheet.create({
    backdrop: {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    spinner: {
      width: '1.25rem',
      height: '1.25rem',
      border: `.25rem solid ${WHITE}`,
      borderLeft: `.25rem solid ${BLUE}`,
      borderRadius: '50%',
      animationName: rotate as any,
      animationTimingFunction: 'linear',
      animationDuration: '.5s',
      animationIterationCount: 'infinite'
    }
  });

  return (
    <div className={css(styleSheet.backdrop)}>
      <div className={css(styleSheet.spinner)}/>
    </div>
  );
};
