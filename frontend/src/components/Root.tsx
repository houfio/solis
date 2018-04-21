import { css, StyleSheet } from 'aphrodite/no-important';
import { createLocation } from 'history';
import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { PageGuard } from '../api/Page';
import { GUARDS } from '../constants';
import { auth } from '../modules/auth';
import { content } from '../modules/content';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { withProps } from '../utils/withProps';
import { Admin } from './Admin';
import { Breadcrumbs } from './Breadcrumbs';
import { Container } from './Container';
import { ContentPage } from './ContentPage';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Progress } from './Progress';
import { Spinner } from './Spinner';

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  pages: state.content.pages,
  queue: state.http,
  token: state.auth.token,
  state
});

const getActionCreators = () => ({
  getPages: content.getPages,
  getMenus: content.getMenus,
  getUser: auth.getUser
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Root = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { token } = this.props;
    const { getPages, getMenus, getUser } = this.props;

    getPages();
    getMenus();

    if (token) {
      getUser({ token });
    }
  }

  public render() {
    const { location, pages, queue } = this.props;

    if (queue.all || !pages) {
      return (
        <Spinner/>
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
        <Progress/>
        <Switch location={location || createLocation(window.location.href)}>
          <Route path="/admin" exact={true} component={Admin}/>
          <Route path="/">
            <>
              <Navigation/>
              <main className={css(styleSheet.main)}>
                <Breadcrumbs/>
                <Container>
                  <Switch>
                    {pages.map((page) => {
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
            </>
          </Route>
        </Switch>
      </div>
    );
  }

  private getRedirect = (routeGuards: PageGuard[]): ReactNode | undefined => {
    const { pages, state } = this.props;

    if (!pages) {
      return;
    }

    for (const routeGuard of routeGuards) {
      const target = findByValue(routeGuard.target, 'id', pages);
      const guard = GUARDS[routeGuard.type];

      if (!guard(state) && target) {
        return (
          <Redirect to={target.path}/>
        );
      }
    }

    return;
  }
});
