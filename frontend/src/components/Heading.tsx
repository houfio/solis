import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { forBreakpoints } from '../utils/forBreakpoints';

type Props = {
  text: string,
  breakpoints: { [B in keyof typeof BREAKPOINTS]?: number },
  styles?: any[]
}

export const Heading = ({ text, breakpoints, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    heading: {
      display: 'block',
      ...forBreakpoints(breakpoints, (breakpoint, value) => ({
        fontSize: `${5 - value}.5rem`
      }))
    }
  });

  return (
    <span className={css(styleSheet.heading, styles)}>
      {text}
    </span>
  );
};
