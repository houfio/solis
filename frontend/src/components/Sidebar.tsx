import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { admin } from '../modules/admin';
import { State } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { SidebarItem } from './SidebarItem';

const mapStateToProps = (state: State) => ({
  collapsed: state.admin.collapsed
});

const getActionCreators = () => ({
  toggleCollapsed: admin.toggleCollapsed
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Sidebar = connect(class extends Component<typeof props> {
  public render() {
    const { collapsed } = this.props;
    const { toggleCollapsed } = this.props;

    const styleSheet = StyleSheet.create({
      sidebar: {
        position: 'fixed',
        width: collapsed ? '75px' : '300px',
        height: '100%',
        color: '#fff',
        background: 'linear-gradient(145deg, #414756 0%, #303540 100%)',
        transition: 'width .2s ease',
        flexShrink: 0,
        zIndex: 50,
        borderRadius: '0 .5rem .5rem 0'
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
        right: 0,
        width: '15px',
        height: '100%',
        cursor: 'pointer',
        '::after': {
          content: '""',
          display: 'block',
          width: '3px',
          height: '30px',
          borderRadius: '3px',
          marginLeft: '-3px',
          backgroundColor: '#fff',
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
        transition: 'margin .2s ease'
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
      },
      items: {
        flex: 1
      }
    });

    return (
      <nav className={css(styleSheet.sidebar)}>
        <div className={css(styleSheet.inner)}>
          <div className={css(styleSheet.brand)}>
            <div className={css(styleSheet.image, styleSheet.brandIcon)}/>
            <div className={css(styleSheet.image, styleSheet.brandText)}/>
          </div>
          <div className={css(styleSheet.items)}>
            <SidebarItem path="/admin" name="Dashboard" icon="chart-pie"/>
            <SidebarItem path="/admin/pages" name="Pagina's" icon="columns"/>
          </div>
          <SidebarItem path="/" name="Terug naar site" icon="sign-out-alt"/>
        </div>
        <div className={css(styleSheet.arrow)} onClick={handle(toggleCollapsed, undefined)}/>
      </nav>
    );
  }
});
