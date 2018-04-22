import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router';

import { Sidebar } from '../components/Sidebar';
import { Dashboard } from './Dashboard';

export const Private = () => {
  const stylesheet = StyleSheet.create({
    admin: {
      display: 'flex',
      height: '100vh'
    },
    main: {
      margin: '2rem'
    }
  });

  return (
    <div className={css(stylesheet.admin)}>
      <Helmet title={`Admin / Jong Nederland`}/>
      <Sidebar/>
      <main className={css(stylesheet.main)}>
        <Route path="/admin" exact={true} component={Dashboard as any}/>
      </main>
    </div>
  );
};
