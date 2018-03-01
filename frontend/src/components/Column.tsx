import * as React from 'react';
import { ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { forBreakpoints } from '../utils/forBreakpoints';

type Props = {
  children: ReactNode,
  breakpoints: { [B in keyof typeof BREAKPOINTS]?: number },
  styles?: any[],
  tag?: string
}

export const Column = ({ children, breakpoints, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    column: {
      flex: '0 0 100%',
      ...forBreakpoints(breakpoints, ((breakpoint, value) => ({
        flexBasis: `${100 / 12 * value}%`
      })))
    }
  });

  return (
    <Tag className={css(styleSheet.column, styles)}>
      {children}
    </Tag>
  );
};
