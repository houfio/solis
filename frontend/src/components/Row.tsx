import * as React from 'react';
import { ReactNode } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

type Props = {
  children: ReactNode,
  tag?: string
}

export const Row = ({ children, tag: Tag = 'div' }: Props) => {
  const styleSheet = StyleSheet.create({
    row: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  });

  return (
    <Tag className={css(styleSheet.row)}>
      {children}
    </Tag>
  );
};
