import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ReactNode } from 'react';

import { PHONE } from '../constants';
import { Heading } from './Heading';

type Props = {
  title: string,
  children: ReactNode
};

export const AdminPage = ({ title, children }: Props) => {
  const stylesheet = StyleSheet.create({
    header: {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      backgroundColor: '#fff',
      width: '100%',
      lineHeight: 1,
      height: '8rem'
    },
    content: {
      width: 'calc(100% - 8rem)',
      marginTop: '8rem',
      backgroundColor: '#eee',
      minHeight: 'calc(100vh - 12rem)',
      padding: '2rem 4rem'
    }
  });

  return (
    <>
      <div className={css(stylesheet.header)}>
        <Heading text={title} breakpoints={{ [PHONE]: 'bold' }}/>
      </div>
      <div className={css(stylesheet.content)}>
        {children}
      </div>
    </>
  );
};
