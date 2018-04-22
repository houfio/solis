import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { push } from 'react-router-redux';

import { Page } from '../api/Page';
import { TABLET_LANDSCAPE } from '../constants';
import { content } from '../modules/content';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { forBreakpoint } from '../utils/forBreakpoint';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { Container } from './Container';
import { Menu } from './Menu';

const mapStateToProps = (state: State) => ({
  pages: state.content.pages,
  menus: state.content.menus,
  openMenu: state.content.openMenu,
  user: state.auth.user
});

const getActionCreators = () => ({
  setOpenMenu: content.setOpenMenu,
  push
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Navigation = connect(class extends Component<typeof props> {
  private menuNodes: { [key: number]: HTMLElement | undefined } = {};

  public render() {
    const { pages, menus, openMenu, user } = this.props;
    const { setOpenMenu, push } = this.props;

    if (!pages || !menus) {
      return false;
    }

    const primaryMenu = findByValue('primary', 'name', menus);
    const homePage = findByValue('home', 'type', pages);

    if (!primaryMenu || !homePage) {
      return false;
    }

    const openNode = openMenu !== undefined ? this.menuNodes[openMenu] : undefined;

    const styleSheet = StyleSheet.create({
      navigation: {
        position: 'fixed',
        width: '100%',
        top: '0',
        color: '#fff',
        zIndex: 2
      },
      bar: {
        backgroundColor: '#1976D2'
      },
      container: {
        display: 'flex'
      },
      brand: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        marginLeft: '-1rem',
        cursor: 'pointer',
        transition: 'opacity .2s ease',
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
      logo: {
        display: 'block',
        backgroundImage: 'url(/static/logo.png)',
        width: '3rem',
        height: '3rem',
        margin: '1rem 0'
      },
      text: {
        display: 'none',
        marginLeft: '1rem',
        backgroundImage: 'url(/static/text.png)',
        height: '3rem',
        width: '7rem',
        ...forBreakpoint(TABLET_LANDSCAPE, {
          display: 'block'
        })
      },
      push: {
        flex: '1'
      },
      item: {
        display: 'inline-block',
        padding: '2rem 1rem',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'opacity .2s ease',
        ':hover': {
          opacity: .5
        },
        ':last-of-type': {
          marginRight: '-1rem'
        }
      },
      active: {
        opacity: .5
      },
      menu: {
        visibility: 'hidden',
        position: 'absolute',
        width: '100%',
        opacity: 0,
        left: 0,
        top: '5rem',
        paddingTop: '.5rem',
        zIndex: 3,
        transition: 'opacity .2s ease, transform .2s ease, visibility 0s linear .2s'
      },
      open: {
        visibility: 'visible',
        opacity: 1,
        transitionDelay: '0s'
      },
      menuLeft: {
        transform: 'translateX(10rem)'
      },
      menuRight: {
        transform: 'translateX(-10rem)'
      },
      backDrop: {
        position: 'absolute',
        width: '100%',
        height: '1px',
        backgroundColor: '#1976D2',
        transformOrigin: '50% 0 0',
        transition: 'transform .2s ease'
      },
      shadow: {
        visibility: 'hidden',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        transition: 'opacity .2s ease, visibility 0s linear .2s',
        backgroundColor: 'rgba(255, 255, 255, .5)',
        opacity: 0
      }
    });

    return (
      <>
        <nav className={css(styleSheet.navigation)}>
          <div className={css(styleSheet.bar)}>
            <Container styles={[styleSheet.container]}>
              <div className={css(styleSheet.brand)} onClick={handle(this.navigateTo, homePage)}>
                <div className={css(styleSheet.image, styleSheet.logo)}/>
                <div className={css(styleSheet.image, styleSheet.text)}/>
              </div>
              <div className={css(styleSheet.push)}/>
              {primaryMenu.items
                .sort((a, b) => a.order - b.order)
                .map((item, index) => (
                  <Fragment key={item.id}>
                    <span
                      className={css(
                        styleSheet.item,
                        openMenu === index && styleSheet.active
                      )}
                      onClick={handle(setOpenMenu, { index })}
                    >
                      {item.name}
                    </span>
                    <div
                      ref={(node) => this.menuNodes[index] = node || undefined}
                      className={css(
                        styleSheet.menu,
                        openMenu === index && styleSheet.open,
                        Number(openMenu) > index && styleSheet.menuRight,
                        Number(openMenu) < index && styleSheet.menuLeft
                      )}
                    >
                      <Container>
                        <Menu menuItem={item} onClick={this.navigateTo}/>
                      </Container>
                    </div>
                  </Fragment>
                ))}
              {user && user.admin && (
                <span className={css(styleSheet.item)} onClick={handle(push, '/admin')}>Admin</span>
              )}
            </Container>
          </div>
          <div
            className={css(styleSheet.backDrop)}
            style={{ transform: `scaleY(${openNode ? openNode.scrollHeight : '0'})` }}
          />
        </nav>
        <div
          className={css(styleSheet.shadow, openMenu !== undefined && styleSheet.open)}
          onClick={handle(setOpenMenu, {})}
        />
      </>
    );
  }

  private navigateTo = (page: Page) => {
    const { setOpenMenu, push } = this.props;

    setOpenMenu({});
    push(page.path);
  }
});
