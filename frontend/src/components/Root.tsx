import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { createLocation } from 'history';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { content } from '../modules/content';
import { RouteGuard } from '../api/RouteGuard';
import { findByValue } from '../utils/findByValue';
import { ContentPage } from './ContentPage';
import { GUARDS } from '../constants';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Container } from './Container';
import { Loading } from './Loading';

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  pages: state.content.pages,
  queue: state.http.queue,
  state
});

const getActionCreators = () => ({
  getPages: content.getPages,
  getMenus: content.getMenus
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Root = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { getPages, getMenus } = this.props;

    getPages();
    getMenus();
  }

  public render() {
    const { location, pages, queue } = this.props;

    if (queue.all || !pages) {
      return (
        <Loading/>
      );
    }

    const styleSheet = StyleSheet.create({
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
      main: {
        flex: '1',
        marginTop: '5rem'
      }
    });

    return (
      <div className={css(styleSheet.body)}>
        <Navigation/>
        <main className={css(styleSheet.main)}>
          <Container>
            <Switch location={location || createLocation(window.location.href)}>
              {pages.map(page => {
                const redirect = this.getRedirect(page.guards);

                return (
                  <Route key={page.id} path={page.path} exact={true}>
                    {redirect || <ContentPage pageId={page.id}/>}
                  </Route>
                );
              })}
            </Switch>
          </Container>
        </main>
        <Footer/>
      </div>
    );
  }

  private getRedirect = (routeGuards: RouteGuard[]): ReactNode | undefined => {
    const { pages, state } = this.props;

    if (!pages) {
      return;
    }

    for (let routeGuard of routeGuards) {
      const target = findByValue(routeGuard.target, 'id', pages);
      const guard = GUARDS[routeGuard.type];

      if (!guard(state) && target) {
        return (
          <Redirect to={target.path}/>
        );
      }
    }

    return;
  };
});
