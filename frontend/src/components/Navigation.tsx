import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { push } from 'react-router-redux';

import { TABLET_LANDSCAPE } from '../constants';
import { content } from '../modules/content';
import { NavigationQuery } from '../schema/__generated__/NavigationQuery';
import { State } from '../types';
import { forBreakpoint } from '../utils/forBreakpoint';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { Container } from './Container';
import { Menu } from './Menu';

import logo from '../assets/logo.png';
import text from '../assets/text.png';
import query from '../schema/navigation.graphql';

const mapStateToProps = (state: State) => ({
  openMenu: state.content.openMenu
});

const getActionCreators = () => ({
  setOpenMenu: content.setOpenMenu,
  push
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Navigation = connect(class extends Component<typeof props> {
  private menuNodes: { [ key: number ]: HTMLElement | undefined } = {};

  public render() {
    const { openMenu } = this.props;
    const { setOpenMenu, push } = this.props;

    const openNode = openMenu !== undefined ? this.menuNodes[ openMenu ] : undefined;

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
        backgroundImage: `url(${logo})`,
        width: '3rem',
        height: '3rem',
        margin: '1rem 0'
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
      <Query<NavigationQuery> query={query}>
        {({ data, loading }) => {
          if (loading || !data) {
            return 'loading haha';
          }

          return (
            <>
              <nav className={css(styleSheet.navigation)}>
                <div className={css(styleSheet.bar)}>
                  <Container styles={[ styleSheet.container ]}>
                    <div className={css(styleSheet.brand)} onClick={handle(this.navigateTo, '/')}>
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
                              <Menu item={item} onClick={this.navigateTo}/>
                            </Container>
                          </div>
                        </Fragment>
                      ))}
                    {data.user && data.user.admin && (
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
        }}
      </Query>
    );
  }

  private navigateTo = (page: string) => {
    const { setOpenMenu, push } = this.props;

    setOpenMenu({});
    push(page);
  }
});
