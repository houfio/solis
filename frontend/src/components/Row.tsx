import { css, StyleDeclaration, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  styles?: StyleDeclaration,
  tag?: string
};

export const Row = ({ children, styles = [], tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    row: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  });

  return (
    <Tag className={css(styleSheet.row, styles)}>
      {children}
    </Tag>
  );
};
