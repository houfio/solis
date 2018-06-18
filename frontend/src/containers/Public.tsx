import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Redirect, Route } from 'react-router';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Input } from '../components/Input';
import { Navigation } from '../components/Navigation';
import { BLUE, GUARDS, WHITE } from '../constants';
import { ContentConsumer } from '../context/content';
import { PublicQuery, PublicQuery_pages } from '../schema/__generated__/PublicQuery';
import { PageGuardType } from '../types';
import { BlogPost } from './BlogPost';
import { ContentPage } from './ContentPage';

import query from '../schema/public.graphql';

const styleSheet = StyleSheet.create({
  main: {
    position: 'relative',
    flex: '1',
    marginTop: '6.5rem'
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: WHITE,
    opacity: .75,
    zIndex: 50,
    transition: 'opacity .2s ease'
  },
  backdropHidden: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s linear .2s, opacity .2s ease'
  },
  modal: {
    position: 'fixed',
    top: 'calc(50vh - 5rem)',
    left: 'calc(50vw - 15rem)',
    backgroundColor: BLUE,
    color: WHITE,
    zIndex: 100,
    width: '30rem',
    height: '11.5rem',
    borderRadius: '2rem',
    padding: '1rem',
    transition: 'opacity .2s ease, transform .2s ease'
  },
  modalHidden: {
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(2rem)',
    transition: 'visibility 0s linear .2s, opacity .2s ease, transform .2s ease'
  },
  modalBig: {
    top: 'calc(50vh - 9rem)',
    height: '18.5rem',
  },
  width: {
    width: '100%',
    textAlign: 'center'
  }
});

const renderPage = (page: PublicQuery_pages) => () => {
  for (const routeGuard of page.guards) {
    const guard = GUARDS[routeGuard.type as PageGuardType];

    if (!guard()) {
      return (
        <Redirect to={routeGuard.target.path}/>
      );
    }
  }

  return <ContentPage page={page}/>;
};

export const Public = () => (
  <Query<PublicQuery> query={query}>
    {({ data, error, loading }) => (
      <ContentConsumer>
        {({ modal }, { setOpenModal }) => (
          <>
            <Navigation/>
            <main className={css(styleSheet.main)}>
              {loading ? 'loading haha' : error ? 'error' : (
                <Container>
                  {data!.pages.map((page) => (
                    <Route
                      key={page.id}
                      path={page.path}
                      exact={true}
                      render={renderPage(page)}
                    />
                  ))}
                  <Route path="/blog/:id" exact={true} component={BlogPost}/>
                </Container>
              )}
            </main>
            <Footer/>
            <div
              className={css(styleSheet.backdrop, !modal && styleSheet.backdropHidden)}
              onClick={setOpenModal.e(undefined)}
            />
            <div
              className={css(
                styleSheet.modal,
                !modal && styleSheet.modalHidden,
                modal === 'register' && styleSheet.modalBig
              )}
            >
              {modal === 'login' ? (
                <>
                  <Input name="email" label="Email"/>
                  <Input name="password" label="Wachtwoord"/>
                  <Button text="Inloggen" styles={styleSheet.width}/>
                </>
              ) : modal === 'register' ? (
                <>
                  <Input name="membershipId" label="Lidnummer"/>
                  <Input name="membershipSection" label="Afdeling"/>
                  <Input name="email" label="Email"/>
                  <Input name="password" label="Wachtwoord"/>
                  <Button text="Aanvragen" styles={styleSheet.width}/>
                </>
              ) : ''}
            </div>
          </>
        )}
      </ContentConsumer>
    )}
  </Query>
);
