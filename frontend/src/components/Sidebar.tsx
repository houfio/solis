import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';

import { content } from '../modules/content';
import { State } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { SidebarItem } from './SidebarItem';

const mapStateToProps = (state: State) => ({
  collapsed: state.content.collapsed
});

const getActionCreators = () => ({
  toggleCollapsed: content.toggleCollapsed,
  push
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Sidebar = connect(class extends Component<typeof props> {
  public render() {
    const { collapsed } = this.props;
    const { toggleCollapsed, push } = this.props;

    const styleSheet = StyleSheet.create({
      sidebar: {
        position: 'relative',
        width: collapsed ? '75px' : '300px',
        color: '#fff',
        backgroundColor: '#414756',
        transition: 'width .2s ease'
      },
      inner: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      },
      arrow: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: '-15px',
        width: '15px',
        height: '100%',
        cursor: 'pointer',
        '::after': {
          content: '""',
          display: 'block',
          width: '2px',
          height: '15px',
          backgroundColor: '#414756',
          transition: 'opacity .2s ease .2s',
          opacity: 0
        },
        ':hover::after': {
          opacity: 1
        }
      },
      brand: {
        display: 'flex',
        margin: collapsed ? '1rem .8rem' : '4rem 3.5rem',
        cursor: 'pointer',
        transition: 'all .2s ease',
        ':hover': {
          opacity: .5
        }
      },
      image: {
        flexShrink: 0,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      },
      brandIcon: {
        backgroundImage: 'url(/static/logo.png)',
        width: '3rem',
        height: '3rem'
      },
      brandText: {
        backgroundImage: 'url(/static/text.png)',
        height: '3rem',
        width: '7rem',
        marginLeft: '1rem',
        transition: 'opacity .2s ease',
        opacity: collapsed ? 0 : 1
      }
    });

    return (
      <nav className={css(styleSheet.sidebar)}>
        <div className={css(styleSheet.inner)}>
          <div className={css(styleSheet.brand)} onClick={handle(push, '/')}>
            <div className={css(styleSheet.image, styleSheet.brandIcon)}/>
            <div className={css(styleSheet.image, styleSheet.brandText)}/>
          </div>
          <SidebarItem path="/admin" name="Dashboard" icon="chart-pie"/>
          <SidebarItem path="/admin/test" name="Test" icon="coffee"/>
        </div>
        <div className={css(styleSheet.arrow)} onClick={handle(toggleCollapsed, undefined)}/>
      </nav>
    );
  }
});
