import { css, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  styles?: StyleDeclaration,
  tag?: string
};

const styleSheet = StyleSheet.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

export const Row = ({ children, styles = [], tag: Tag = 'div' }: Props) => (
  <Tag className={css(styleSheet.row, styles)}>
    {children}
  </Tag>
);
