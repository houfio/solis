import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route } from 'react-router';

import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { GUARDS } from '../constants';
import { PublicQuery, PublicQuery_pages } from '../schema/__generated__/PublicQuery';
import { PageGuardType } from '../types';
import { ContentPage } from './ContentPage';

import query from '../schema/public.graphql';

export class Public extends Component {
  public render() {
    const styleSheet = StyleSheet.create({
      main: {
        position: 'relative',
        flex: '1',
        marginTop: '4.5rem'
      }
    });

    return (
      <Query<PublicQuery> query={query}>
        {({ data, loading }) => (
          <>
            <Navigation/>
            <main className={css(styleSheet.main)}>
              {loading || !data || !data.pages ? 'loading haha' : (
                <Container>
                  {data.pages.map((page) => (
                    <Route
                      key={page.id}
                      path={page.path}
                      exact={true}
                      render={this.renderPage(page)}
                    />
                  ))}
                </Container>
              )}
            </main>
            <Footer/>
          </>
        )}
      </Query>
    );
  }

  private renderPage = (page: PublicQuery_pages) => () => {
    for (const routeGuard of page.guards) {
      const guard = GUARDS[ routeGuard.type as PageGuardType ];

      if (!guard()) {
        return (
          <Redirect to={routeGuard.target.path}/>
        );
      }
    }

    return <ContentPage page={page}/>;
  }
}
