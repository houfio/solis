import { hot } from 'react-hot-loader'; // tslint:disable-next-line
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { Private } from './Private';
import { Public } from './Public';

export const Root = hot(module)(() => {
  const styleSheet = StyleSheet.create({
    body: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
  });

  return (
    <div className={css(styleSheet.body)}>
      <Switch>
        <Route path="/admin" component={Private}/>
        <Route path="/" component={Public}/>
      </Switch>
    </div>
  );
});
