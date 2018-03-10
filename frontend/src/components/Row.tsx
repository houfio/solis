import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  children: ReactNode,
  styles?: (CSSProperties | false)[],
  tag?: string
}

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
