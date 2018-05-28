import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { Query } from 'react-apollo';

import { BLACK, BLUE, DARK_BLUE, TABLET_LANDSCAPE, WHITE } from '../constants';
import { content } from '../modules/content';
import { NavigationQuery } from '../schema/__generated__/NavigationQuery';
import { State } from '../types';
import { forBreakpoint } from '../utils/forBreakpoint';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { Breadcrumbs } from './Breadcrumbs';
import { Container } from './Container';
import { Menu } from './Menu';
import { RouterContextConsumer } from './RouterContextConsumer';

import logo from '../assets/logo.png';
import text from '../assets/text.png';
import query from '../schema/navigation.graphql';

const mapStateToProps = (state: State) => ({
  openMenu: state.content.openMenu,
  breadcrumbs: state.content.breadcrumbs
});

const getActionCreators = () => ({
  setOpenMenu: content.setOpenMenu,
  toggleBreadcrumbs: content.toggleBreadcrumbs
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Navigation = connect(class extends Component<typeof props> {
  private menuNodes: { [ key: number ]: HTMLElement | undefined } = {};

  public render() {
    const { openMenu, breadcrumbs } = this.props;
    const { setOpenMenu, toggleBreadcrumbs } = this.props;

    const openNode = openMenu !== undefined ? this.menuNodes[ openMenu ] : undefined;

    const styleSheet = StyleSheet.create({
      navigation: {
        position: 'fixed',
        width: '100%',
        top: '0',
        color: WHITE,
        zIndex: 2
      },
      bar: {
        background: `linear-gradient(90deg, ${BLUE} 0%, ${DARK_BLUE} 100%)`,
        borderRadius: breadcrumbs ? '' : '0 0 .5rem .5rem',
        transition: 'all .2s ease'
      },
      container: {
        display: 'flex'
      },
      brand: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        margin: '1rem 0 0 -1rem',
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
        backgroundImage: `url(${logo})`,
        width: '3rem',
        height: '3rem'
      },
      text: {
        display: 'none',
        marginLeft: '1rem',
        backgroundImage: `url(${text})`,
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
        padding: '.5rem 1rem',
        margin: '1.5rem 0 .5rem 0',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'all .2s ease',
        borderRadius: '2rem',
        ':hover': {
          color: BLACK,
          backgroundColor: 'rgba(255, 255, 255, .75)'
        },
        ':last-of-type': {
          marginRight: '-1rem'
        }
      },
      active: {
        color: BLACK,
        backgroundColor: WHITE
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
        backgroundColor: `linear-gradient(90deg, ${BLUE} 0%, ${DARK_BLUE} 100%)`,
        transition: 'height .2s ease'
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
      },
      arrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: breadcrumbs ? 'translateY(3.125rem)' : '',
        height: '1rem',
        cursor: 'pointer',
        transition: 'transform .2s ease',
        '::after': {
          content: '""',
          display: 'block',
          width: '1.5rem',
          height: '4px',
          borderRadius: '4px',
          backgroundColor: breadcrumbs ? 'rgba(0, 0, 0, .9)' : 'rgba(255, 255, 255, .9)',
          transition: `background-color 0s linear ${breadcrumbs ? '.05' : '.1'}s`
        }
      }
    });

    return (
      <Query<NavigationQuery> query={query}>
        {({ data, loading }) => {
          if (loading || !data) {
            return 'loading haha';
          }

          return (
            <RouterContextConsumer>
              {({ history: { push } }) => {
                const navigateTo = (page: string) => {
                  setOpenMenu({});
                  push(page);
                };

                const navigateToAdmin = () => {
                  push('/admin');
                };

                return (
                  <>
                    <nav className={css(styleSheet.navigation)}>
                      <div className={css(styleSheet.bar)}>
                        <Container styles={[ styleSheet.container ]}>
                          <div className={css(styleSheet.brand)} onClick={handle(navigateTo, '/')}>
                            <div className={css(styleSheet.image, styleSheet.logo)}/>
                            <div className={css(styleSheet.image, styleSheet.text)}/>
                          </div>
                          <div className={css(styleSheet.push)}/>
                          {[ ...data.menu ]
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
                                  ref={(node) => this.menuNodes[ index ] = node || undefined}
                                  className={css(
                                    styleSheet.menu,
                                    openMenu === index && styleSheet.open,
                                    Number(openMenu) > index && styleSheet.menuRight,
                                    Number(openMenu) < index && styleSheet.menuLeft
                                  )}
                                >
                                  <Container>
                                    <Menu item={item} onClick={navigateTo}/>
                                  </Container>
                                </div>
                              </Fragment>
                            ))}
                          {data.user && data.user.admin && (
                            <span className={css(styleSheet.item)} onClick={navigateToAdmin}>Admin</span>
                          )}
                        </Container>
                        <div
                          className={css(styleSheet.backDrop)}
                          style={{ height: openNode ? `${openNode.scrollHeight}px` : 0 }}
                        />
                        <div className={css(styleSheet.arrow)} onClick={handle(toggleBreadcrumbs, undefined)}/>
                        <Breadcrumbs/>
                      </div>
                    </nav>
                    <div
                      className={css(styleSheet.shadow, openMenu !== undefined && styleSheet.open)}
                      onClick={handle(setOpenMenu, {})}
                    />
                  </>
                );
              }}
            </RouterContextConsumer>
          );
        }}
      </Query>
    );
  }
});
