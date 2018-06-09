import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ReactNode } from 'react';

import { PHONE, WHITE } from '../constants';
import { AdminConsumer } from '../context/admin';
import { Heading } from './Heading';

type Props = {
  title: string,
  actions?: ReactNode[],
  padding?: boolean,
  children: ReactNode
};

export const AdminPage = ({ title, actions, padding = true, children }: Props) => (
  <AdminConsumer>
    {({ collapsed }) => {
      const stylesheet = StyleSheet.create({
        header: {
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4rem',
          width: `calc(100% - ${collapsed ? '75px' : '300px'})`,
          backgroundColor: WHITE,
          lineHeight: 1,
          height: '8rem',
          transition: 'width .2s ease'
        },
        heading: {
          flex: 1
        },
        content: {
          marginTop: '8rem',
          padding: padding ? '2rem 4rem' : 0
        }
      });

      return (
        <>
          <div className={css(stylesheet.header)}>
            <Heading text={title} breakpoints={{ [ PHONE ]: 'bold' }} styles={[ stylesheet.heading ]}/>
            {actions}
          </div>
          <div className={css(stylesheet.content)}>
            {children}
          </div>
        </>
      );
    }}
  </AdminConsumer>
);
