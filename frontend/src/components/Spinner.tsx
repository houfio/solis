import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

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
      width: '1rem',
      height: '1rem',
      border: '.25rem solid #BDC1C6',
      borderLeft: '.25rem solid #1976D2',
      borderRadius: '50%',
      animationName: rotate,
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
