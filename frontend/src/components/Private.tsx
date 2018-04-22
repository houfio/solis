import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Sidebar } from './Sidebar';

export const Private = () => {
  const stylesheet = StyleSheet.create({
    admin: {
      display: 'flex',
      height: '100vh'
    }
  });

  return (
    <div className={css(stylesheet.admin)}>
      <Helmet title={`Admin / Jong Nederland`} />
      <Sidebar/>
      <main>
        Admin
      </main>
    </div>
  );
};
