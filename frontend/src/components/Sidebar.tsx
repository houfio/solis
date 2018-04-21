import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

type LocalState = {
  collapsed: boolean
};

export class Sidebar extends Component<{}, LocalState> {
  public state = {
    collapsed: !!Number(localStorage.getItem('collapsed'))
  };

  public render() {
    const { collapsed } = this.state;

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
        padding: collapsed ? '1rem .8rem' : '4rem 3.5rem',
        transition: 'padding .2s ease'
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
      item: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: collapsed ? '1rem' : '220px',
        height: '1rem',
        marginLeft: collapsed ? '14px' : '25px',
        marginBottom: collapsed ? '10px' : '15px',
        padding: '15px',
        cursor: 'pointer',
        borderRadius: '.5rem',
        lineHeight: 1,
        transition: 'all .2s ease',
        ':hover': {
          color: '#414756',
          backgroundColor: '#fff'
        }
      },
      itemIcon: {
        marginLeft: collapsed ? '-2px' : 0,
        marginRight: '10px'
      },
      itemText: {
        transition: 'opacity .2s ease',
        opacity: collapsed ? 0 : 1
      },
      active: {
        color: '#414756',
        backgroundColor: '#fff',
        cursor: 'default'
      }
    });

    return (
      <nav className={css(styleSheet.sidebar)}>
        <div className={css(styleSheet.inner)}>
          <div className={css(styleSheet.brand)}>
            <div className={css(styleSheet.image, styleSheet.brandIcon)}/>
            <div className={css(styleSheet.image, styleSheet.brandText)}/>
          </div>
          <div className={css(styleSheet.item, styleSheet.active)}>
            <FontAwesomeIcon icon="coffee" className={css(styleSheet.itemIcon)}/>
            <span className={css(styleSheet.itemText)}>Test item</span>
          </div>
          <div className={css(styleSheet.item)}>
            <FontAwesomeIcon icon="coffee" className={css(styleSheet.itemIcon)}/>
            <span className={css(styleSheet.itemText)}>Test item 2</span>
          </div>
        </div>
        <div className={css(styleSheet.arrow)} onClick={this.toggleCollapsed}/>
      </nav>
    );
  }

  private toggleCollapsed = () => {
    const { collapsed } = this.state;

    localStorage.setItem('collapsed', collapsed ? '0' : '1');

    this.setState({
      collapsed: !collapsed
    });
  }
}
