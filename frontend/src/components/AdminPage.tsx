import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, ReactNode } from 'react';

import { PHONE } from '../constants';
import { State } from '../types';
import { withProps } from '../utils/withProps';
import { Heading } from './Heading';

type Props = {
  title: string,
  actions?: ReactNode[],
  padding?: boolean,
  children: ReactNode
};

const mapStateToProps = (state: State) => ({
  collapsed: state.admin.collapsed
});

const { props, connect } = withProps<Props>()(mapStateToProps);

export const AdminPage = connect(class extends Component<typeof props> {
  public render() {
    const { title, actions, padding = true, children } = this.props;
    const { collapsed } = this.props;

    const stylesheet = StyleSheet.create({
      header: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4rem 0 4.5rem',
        backgroundColor: '#fff',
        width: `calc(100% - ${collapsed ? '75px' : '300px'} + .5rem)`,
        lineHeight: 1,
        height: '8rem',
        transition: 'width .2s ease'
      },
      heading: {
        flex: 1
      },
      content: {
        width: 'calc(100%)',
        marginTop: '8rem',
        backgroundColor: '#eee',
        minHeight: 'calc(100vh - 8rem)',
        padding: padding ? '2rem 4rem 2rem 4.5rem' : '0 0 0 .5rem'
      }
    });

    return (
      <>
        <div className={css(stylesheet.header)}>
          <Heading text={title} breakpoints={{ [PHONE]: 'bold' }} styles={[stylesheet.heading]}/>
          {actions}
        </div>
        <div className={css(stylesheet.content)}>
          {children}
        </div>
      </>
    );
  }
});
