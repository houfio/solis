import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Fragment } from 'react';
import { Query } from 'react-apollo';

import { BLACK, BLUE, DARK_BLUE, TABLET_LANDSCAPE, WHITE } from '../constants';
import { contentActions, ContentConsumer } from '../context/content';
import { RouterConsumer } from '../context/router';
import { NavigationQuery } from '../schema/__generated__/NavigationQuery';
import { Push } from '../types';
import { forBreakpoint } from '../utils/forBreakpoint';
import { Arrow } from './Arrow';
import { Breadcrumbs } from './Breadcrumbs';
import { Container } from './Container';
import { Hamburger } from './Hamburger';
import { Menu } from './Menu';

import logo from '../assets/logo.png';
import query from '../schema/navigation.graphql';

let menuNodes: { [key: number]: HTMLElement | undefined } = {};

const navigateTo = (push: Push) => (page: string) => {
  contentActions.setOpenMenu(undefined);
  push(page);
};

const navigateToPage = (push: Push, page: string) => () => {
  navigateTo(push)(page);
};

const setMenuNode = (index: number) => (node: HTMLElement | null) => {
  menuNodes = {
    ...menuNodes,
    [index]: node || undefined
  };
};

const toggleMobileMenu = (openNode: HTMLElement | undefined) => () => {
  contentActions.setOpenMenu(openNode ? undefined : -1);
};

export const Navigation = () => (
  <ContentConsumer>
    {({ openMenu, breadcrumbs }, { setOpenMenu, toggleBreadcrumbs }) => {
      const openNode = openMenu !== undefined ? menuNodes[openMenu] : undefined;

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
          cursor: 'pointer'
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
        push: {
          flex: '1'
        },
        item: {
          display: 'none',
          padding: '.5rem 1rem',
          margin: '1.5rem .25rem .5rem .25rem',
          cursor: 'pointer',
          lineHeight: 1,
          transition: 'all .2s ease',
          borderRadius: '2rem',
          whiteSpace: 'nowrap',
          ...forBreakpoint(TABLET_LANDSCAPE, {
            display: 'inline-block'
          }),
          ':hover': {
            color: BLACK,
            backgroundColor: 'rgba(255, 255, 255, .75)'
          },
          ':last-of-type': {
            marginRight: '-1rem'
          }
        },
        hamburger: {
          marginTop: '1.75rem',
          ...forBreakpoint(TABLET_LANDSCAPE, {
            display: 'none'
          })
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
          top: '4rem',
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
          transform: breadcrumbs ? 'translateY(3.0625rem)' : '',
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
        },
        mobileList: {
          display: 'flex',
          flexDirection: 'column'
        },
        mobileItem: {
          padding: '1rem 0',
          cursor: 'pointer',
          transition: 'padding-left .2s ease',
          ':hover': {
            paddingLeft: '.5rem'
          }
        },
        mobileArrow: {
          visibility: 'hidden',
          opacity: 0,
          transition: 'visibility 0s linear .2s, opacity .2s ease, padding-left .2s ease',
          marginTop: '1.75rem',
          ':hover': {
            paddingLeft: '.5rem'
          }
        },
        mobileArrowVisible: {
          visibility: 'visible',
          opacity: 1,
          transition: 'opacity .2s ease, padding-left .2s ease'
        }
      });

      return (
        <Query<NavigationQuery> query={query}>
          {({ data, loading }) => {
            if (loading || !data) {
              return 'loading haha';
            }

            return (
              <RouterConsumer>
                {({ history: { push } }) => (
                  <>
                    <nav className={css(styleSheet.navigation)}>
                      <div className={css(styleSheet.bar)}>
                        <Container styles={[styleSheet.container]}>
                          <div className={css(styleSheet.brand)} onClick={navigateToPage(push, '/')}>
                            <div className={css(styleSheet.image, styleSheet.logo)}/>
                          </div>
                          <Arrow
                            onClick={setOpenMenu.e(-1)}
                            styles={[
                              styleSheet.mobileArrow,
                              openMenu !== undefined && openMenu !== -1 && styleSheet.mobileArrowVisible
                            ]}
                          />
                          <div className={css(styleSheet.push)}/>
                          <div
                            ref={setMenuNode(-1)}
                            className={css(
                              styleSheet.menu,
                              openMenu === -1 && styleSheet.open,
                              Number(openMenu) > -1 && styleSheet.menuRight,
                              Number(openMenu) < -1 && styleSheet.menuLeft
                            )}
                          >
                            <Container>
                              <div className={css(styleSheet.mobileList)}>
                                {[...data.menu]
                                  .sort((a, b) => a.order - b.order)
                                  .map((item, index) => (
                                    <span
                                      key={item.id}
                                      onClick={setOpenMenu.e(index)}
                                      className={css(styleSheet.mobileItem)}
                                    >
                                      {item.name}
                                    </span>
                                  ))}
                              </div>
                            </Container>
                          </div>
                          {[...data.menu]
                            .sort((a, b) => a.order - b.order)
                            .map((item, index) => (
                              <Fragment key={item.id}>
                                <span
                                  className={css(
                                    styleSheet.item,
                                    openMenu === index && styleSheet.active
                                  )}
                                  onClick={setOpenMenu.e(index)}
                                >
                                  {item.name}
                                </span>
                                <div
                                  ref={setMenuNode(index)}
                                  className={css(
                                    styleSheet.menu,
                                    openMenu === index && styleSheet.open,
                                    Number(openMenu) > index && styleSheet.menuRight,
                                    Number(openMenu) < index && styleSheet.menuLeft
                                  )}
                                >
                                  <Container>
                                    <Menu item={item} onClick={navigateTo(push)}/>
                                  </Container>
                                </div>
                              </Fragment>
                            ))}
                          {data.user && data.user.admin && (
                            <span
                              className={css(styleSheet.item)}
                              onClick={navigateToPage(push, '/admin')}
                            >
                              Admin
                            </span>
                          )}
                          <Hamburger
                            active={Boolean(openNode)}
                            onToggle={toggleMobileMenu(openNode)}
                            styles={styleSheet.hamburger}
                          />
                        </Container>
                        <div
                          className={css(styleSheet.backDrop)}
                          style={{ height: openNode ? `${openNode.scrollHeight}px` : 0 }}
                        />
                        <div className={css(styleSheet.arrow)} onClick={toggleBreadcrumbs}/>
                        <Breadcrumbs pages={data.pages}/>
                      </div>
                    </nav>
                    <div
                      className={css(styleSheet.shadow, openMenu !== undefined && styleSheet.open)}
                      onClick={setOpenMenu.e(undefined)}
                    />
                  </>
                )}
              </RouterConsumer>
            );
          }}
        </Query>
      );
    }}
  </ContentConsumer>
);
