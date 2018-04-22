import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Redirect, Route } from 'react-router';

import { Page, PageGuard } from '../api/Page';
import { GUARDS } from '../constants';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { withProps } from '../utils/withProps';
import { Breadcrumbs } from './Breadcrumbs';
import { Container } from './Container';
import { ContentPage } from './ContentPage';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Progress } from './Progress';

const mapStateToProps = (state: State) => ({
  pages: state.content.pages,
  state
});

const { props, connect } = withProps()(mapStateToProps);

export const Public = connect(class extends Component<typeof props> {
  public render() {
    const { pages } = this.props;

    const styleSheet = StyleSheet.create({
      main: {
        flex: '1',
        marginTop: '5rem'
      }
    });

    return (
      <>
        <Progress/>
        <Navigation/>
        <main className={css(styleSheet.main)}>
          <Breadcrumbs/>
          <Container>
            {pages!.map((page) => (
              <Route
                key={page.id}
                path={page.path}
                exact={true}
                render={this.renderPage(page)}
              />
            ))}
          </Container>
        </main>
        <Footer/>
      </>
    );
  }

  private renderPage = (page: Page) => () => this.getRedirect(page.guards) || (
    <ContentPage pageId={page.id}/>
  )

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
