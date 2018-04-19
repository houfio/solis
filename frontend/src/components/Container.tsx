import { css, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ReactNode } from 'react';

import { BREAKPOINTS } from '../constants';
import { forBreakpoints } from '../utils/forBreakpoints';

type Props = {
  children: ReactNode,
  styles?: StyleDeclaration,
  tag?: string
};

export const Container = ({ children, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    container: {
      margin: '0 auto',
      padding: '0 1rem',
      ...forBreakpoints(BREAKPOINTS, (value) => ({
        width: 'calc(' + (value !== '0' ? value + ' - 1rem' : '100%') + ' - 2rem)'
      }))
    }
  });

  return (
    <Tag className={css(styleSheet.container, styles)}>
      {children}
    </Tag>
  );
};
