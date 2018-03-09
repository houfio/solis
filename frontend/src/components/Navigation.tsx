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
import { handle } from '../utils/handle';

type LocalState = {
  openMenu?: number
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
    openMenu: undefined
  };

  private menuNodes: { [key: number]: HTMLElement | undefined } = {};
  private timeoutId = 0;

  public render() {
    const { pages, menus } = this.props;
    const { openMenu } = this.state;

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
        color: 'white'
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
        display: 'inline-block',
        padding: '2rem 1rem',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'opacity .2s ease',
        ':hover': {
          opacity: '.5'
        },
        ':last-child': {
          marginRight: '-1rem'
        }
      },
      menu: {
        visibility: 'hidden',
        position: 'absolute',
        width: '100%',
        opacity: 0,
        left: 0,
        top: '5rem',
        paddingTop: '.5rem',
        zIndex: 1,
        transition: 'opacity .2s ease, transform .2s ease, visibility 0s linear .2s'
      },
      menuOpen: {
        visibility: 'shown',
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
        transform: `scaleY(${openNode ? openNode.scrollHeight : '0'})`,
        backgroundColor: '#1976D2',
        transformOrigin: '50% 0 0',
        transition: 'transform .2s ease'
      }
    });

    return (
      <nav className={css(styleSheet.navigation)}>
        <div className={css(styleSheet.bar)}>
          <Container styles={[styleSheet.container]}>
            <div className={css(styleSheet.brand)} onClick={handle(this.navigateTo, homePage)}>
              <div className={css(styleSheet.logo)}/>
              <span className={css(styleSheet.text)}>Jong Nederland</span>
            </div>
            <div className={css(styleSheet.push)}/>
            {primaryMenu.items.map((item, index) => {
              const page = findByValue(item.page_id, 'id', pages);

              if (!page) {
                return false;
              }

              return (
                <div
                  key={index}
                  onMouseEnter={handle(this.setOpenMenu, index)}
                  onMouseLeave={handle(this.setOpenMenu, undefined)}
                >
                  <span
                    className={css(styleSheet.item)}
                    onClick={handle(this.navigateTo, page)}
                  >
                    {page.name}
                  </span>
                  <div
                    ref={node => this.menuNodes[index] = node || undefined}
                    className={css(
                      styleSheet.menu,
                      openMenu === index && styleSheet.menuOpen,
                      Number(openMenu) > index && styleSheet.menuRight,
                      Number(openMenu) < index && styleSheet.menuLeft
                    )}
                  >
                    <Container>
                      <Menu menuItem={item} onClick={this.navigateTo}/>
                    </Container>
                  </div>
                </div>
              );
            })}
          </Container>
        </div>
        <div className={css(styleSheet.backDrop)}/>
      </nav>
    );
  }

  private navigateTo = (page: Page) => {
    const { push } = this.props;

    push(page.path);

    this.setState({
      openMenu: undefined
    });
  };

  private setOpenMenu = (openMenu?: number) => {
    clearTimeout(this.timeoutId as any);

    if (openMenu !== undefined) {
      this.setState({ openMenu });

      return;
    }

    this.timeoutId = setTimeout(
      () => this.setState({ openMenu }),
      250
    ) as any;
  };
});
