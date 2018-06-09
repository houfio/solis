import { faChartPie } from '@fortawesome/fontawesome-free-solid/faChartPie';
import { faColumns } from '@fortawesome/fontawesome-free-solid/faColumns';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { DARK_BLUE, TURQUOISE_ACCENT, WHITE } from '../constants';
import { adminActions, AdminConsumer } from '../context/admin';
import { SidebarItem } from './SidebarItem';

import logo from '../assets/logo.png';
import text from '../assets/text.png';

const toggleCollapsed = () => () => {
  adminActions.toggleCollapsed();
};

export const Sidebar = () => (
  <AdminConsumer>
    {({ collapsed }) => {
      const styleSheet = StyleSheet.create({
        sidebar: {
          position: 'fixed',
          width: collapsed ? '75px' : '300px',
          height: '100%',
          color: WHITE,
          background: `linear-gradient(145deg, ${DARK_BLUE} 0%, ${TURQUOISE_ACCENT} 100%)`,
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
            width: '4px',
            height: '25px',
            borderRadius: '4px',
            marginLeft: '-1px',
            backgroundColor: '#fff'
          }
        },
        brand: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          width: collapsed ? '3rem' : '4rem',
          height: collapsed ? '3rem' : '4rem',
          transition: 'all .2s ease'
        },
        brandText: {
          backgroundImage: `url(${text})`,
          height: collapsed ? 0 : '3rem',
          width: '7rem',
          marginTop: '.5rem',
          transition: 'all .2s ease',
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
          <div className={css(styleSheet.arrow)} onClick={toggleCollapsed()}/>
        </nav>
      );
    }}
  </AdminConsumer>
);
