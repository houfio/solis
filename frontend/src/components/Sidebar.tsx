import { faChartPie } from '@fortawesome/fontawesome-free-solid/faChartPie';
import { faColumns } from '@fortawesome/fontawesome-free-solid/faColumns';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { DARK_BLUE, DARK_BLUE_ACCENT, WHITE } from '../constants';
import { admin } from '../modules/admin';
import { State } from '../types';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { SidebarItem } from './SidebarItem';

import logo from '../assets/logo.png';
import text from '../assets/text.png';

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
        color: WHITE,
        background: `linear-gradient(145deg, ${DARK_BLUE} 0%, ${DARK_BLUE_ACCENT} 100%)`,
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
          backgroundColor: '#fff'
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
        backgroundImage: `url(${logo})`,
        width: '3rem',
        height: '3rem'
      },
      brandText: {
        backgroundImage: `url(${text})`,
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
            <SidebarItem path="/admin" name="Dashboard" icon={faChartPie}/>
            <SidebarItem path="/admin/pages" name="Pagina's" icon={faColumns}/>
          </div>
          <SidebarItem path="/" name="Terug naar site" icon={faSignOutAlt}/>
        </div>
        <div className={css(styleSheet.arrow)} onClick={handle(toggleCollapsed, undefined)}/>
      </nav>
    );
  }
});
