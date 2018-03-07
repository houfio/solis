import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { createLocation } from 'history';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { content } from '../modules/content';
import { RouteGuard, RouteGuards } from '../api/RouteGuard';
import { findByKey } from '../utils/findByKey';
import { ContentPage } from './ContentPage';
import { GUARDS } from '../constants';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Container } from './Container';

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

    if (queue.all) {
      return (
        'loading all'
      );
    } else if (!pages) {
      return (
        'no pages'
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
              {pages.map((page, index) => {
                const redirect = this.getRedirect(page.guards);

                return (
                  <Route key={index} path={page.path} exact={true}>
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

  private getRedirect = (routeGuards: RouteGuards): ReactNode | undefined => {
    const { pages, state } = this.props;

    if (!pages) {
      return;
    }

    for (let routeGuard in routeGuards) {
      if (routeGuards.hasOwnProperty(routeGuard)) {
        const guardName = routeGuard as RouteGuard;
        const guardTarget = routeGuards[guardName];
        const guard = GUARDS[guardName];

        if (!guard(state) && guardTarget) {
          const page = findByKey(guardTarget, 'id', pages);

          return (
            <Redirect to={page ? page.path : '/'}/>
          );
        }
      }
    }

    return;
  };
});
