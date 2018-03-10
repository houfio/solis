import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { forBreakpoints } from '../utils/forBreakpoints';
import { isNumber } from 'util';

type Props = {
  children: ReactNode,
  breakpoints: { [B in keyof typeof BREAKPOINTS]?: { size?: number, offset?: number } | number },
  styles?: (CSSProperties | false)[],
  tag?: string
}

export const Column = ({ children, breakpoints, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    column: {
      flex: '0 0 100%',
      ...forBreakpoints(breakpoints, value => {
        if (isNumber(value)) {
          return {
            flexBasis: value && `${100 / 12 * value}%`,
          };
        }

        return {
          flexBasis: value.size && `${100 / 12 * value.size}%`,
          marginLeft: value.offset && `${100 / 12 * value.offset}%`
        };
      })
    }
  });

  return (
    <Tag className={css(styleSheet.column, styles)}>
      {children}
    </Tag>
  );
};
