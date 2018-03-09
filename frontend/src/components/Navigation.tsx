import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { push } from 'react-router-redux';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { Container } from './Container';
import { Page } from '../api/Page';
import { Menu } from './Menu';
import { forBreakpoint } from '../utils/forBreakpoint';
import { TABLET_LANDSCAPE } from '../constants';
import { findByValue } from '../utils/findByValue';

type LocalState = {
  openMenu?: number,
  hovering: boolean
}

const mapStateToProps = (state: State) => ({
  pages: state.content.pages,
  menus: state.content.menus
});

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Navigation = connect(class extends Component<typeof props, LocalState> {
  public state = {
    openMenu: undefined,
    hovering: false
  };

  public render() {
    const { pages, menus } = this.props;
    const { openMenu, hovering } = this.state;

    if (!pages || !menus) {
      return false;
    }

    const indexedPages: { [id: number]: Page } = pages.reduce(
      (previous, current) => ({
        ...previous,
        [current.id]: current
      }),
      {}
    );

    const styleSheet = StyleSheet.create({
      navigation: {
        position: 'fixed',
        width: '100%',
        color: 'white',
        backgroundColor: '#1976D2',
        top: '0'
      },
      container: {
        display: 'flex'
      },
      brand: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        marginLeft: '-1rem',
        ':hover': {
          cursor: 'pointer',
          opacity: '.5'
        }
      },
      logo: {
        display: 'block',
        background: 'url(static/logo.png)',
        backgroundSize: '100%',
        width: '3rem',
        height: '3rem',
        margin: '1rem 0'
      },
      text: {
        display: 'none',
        marginLeft: '1rem',
        lineHeight: '1',
        ...forBreakpoint(TABLET_LANDSCAPE, {
          display: 'block'
        })
      },
      push: {
        flex: '1'
      },
      item: {
        padding: '2rem 1rem',
        ':hover': {
          cursor: 'pointer',
          opacity: '.5'
        },
        ':last-child': {
          marginRight: '-1rem'
        }
      },
      menu: {
        position: 'absolute',
        width: '100%',
        padding: '1rem 0 0 0',
        backgroundColor: '#1976D2'
      }
    });

    const homePage = findByValue('home', 'type', pages);

    if (!homePage) {
      return false;
    }

    return (
      <nav className={css(styleSheet.navigation)}>
        <Container styles={[styleSheet.container]}>
          <div className={css(styleSheet.brand)} onClick={() => this.navigateTo(homePage)}>
            <div className={css(styleSheet.logo)}/>
            <span className={css(styleSheet.text)}>Jong Nederland</span>
          </div>
          <div className={css(styleSheet.push)}/>
          {menus.header.map((menu, index) => (
            <span
              key={index}
              className={css(styleSheet.item)}
              onClick={() => this.navigateTo(indexedPages[menu.page_id])}
              onMouseEnter={() => this.setState({ openMenu: index, hovering: true })}
              onMouseLeave={() => this.setState({ hovering: false })}
            >
              {indexedPages[menu.page_id].name}
            </span>
          ))}
        </Container>
        {hovering && (
          <div
            className={css(styleSheet.menu)}
            onMouseEnter={() => this.setState({ hovering: true })}
            onMouseLeave={() => this.setState({ hovering: false })}
          >
            <Container>
              <Menu menu={menus.header[openMenu!]} onClick={this.navigateTo}/>
            </Container>
          </div>
        )}
      </nav>
    );
  }

  private navigateTo = (page: Page) => {
    const { push } = this.props;

    push(page.path);

    this.setState({
      openMenu: undefined,
      hovering: false
    });
  };
});
