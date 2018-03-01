import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { push } from 'react-router-redux';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { Container } from './Container';
import { Page } from '../api/Page';
import { Row } from './Row';
import { Column } from './Column';
import { Heading } from './Heading';
import { PHONE, TABLET_LANDSCAPE } from '../constants';

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
        position: 'relative',
        flex: '1'
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
        position: 'absolute',
        top: '2rem',
        left: '4rem',
        lineHeight: '1'
      },
      item: {
        padding: '2rem 1rem',
        ':hover': {
          cursor: 'pointer',
          opacity: '.5'
        },
        ':last-child': {
          paddingRight: '0'
        }
      },
      menu: {
        position: 'absolute',
        width: '100%',
        padding: '2rem 0 0 0',
        backgroundColor: '#1976D2'
      },
      heading: {
        marginBottom: '.5rem'
      },
      category: {
        display: 'flex',
        marginBottom: '2rem',
        flexDirection: 'column'
      },
      link: {
        ':hover': {
          cursor: 'pointer',
          opacity: '.5'
        }
      }
    });

    return (
      <nav className={css(styleSheet.navigation)}>
        <Container styles={[styleSheet.container]}>
          <div className={css(styleSheet.brand)}>
            <div className={css(styleSheet.logo)}/>
            <span className={css(styleSheet.text)}>Jong Nederland</span>
          </div>
          {menus.header.map((menu, index) => (
            <span
              key={index}
              className={css(styleSheet.item)}
              onClick={this.navigateTo(indexedPages[menu.page_id])}
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
            {menus.header.filter((menu, index) => index === openMenu).map((menu, index) => (
              <Container key={index}>
                <Row>
                  {menu.rows.map((row, index) => (
                    <Column
                      key={index}
                      breakpoints={{ [PHONE]: 6, [TABLET_LANDSCAPE]: 3 }}
                      styles={[styleSheet.category]}
                    >
                      <Heading text={row.name} breakpoints={{ [PHONE]: 4 }} styles={[styleSheet.heading]}/>
                      {row.items.map(item => (
                        <a
                          key={item}
                          className={css(styleSheet.link)}
                          onClick={this.navigateTo(indexedPages[item])}
                        >
                          {indexedPages[item].name}
                        </a>
                      ))}
                    </Column>
                  ))}
                </Row>
              </Container>
            ))}
          </div>
        )}
      </nav>
    );
  }

  private navigateTo = (page: Page) => () => {
    const { push } = this.props;

    push(page.path);

    this.setState({
      openMenu: undefined,
      hovering: false
    });
  };
});
