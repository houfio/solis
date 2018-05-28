import { hot } from 'react-hot-loader'; // tslint:disable-next-line
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router';

import { Notifications } from '../components/Notifications';
import { withProps } from '../utils/withProps';
import { Private } from './Private';
import { Public } from './Public';

const { props, connect } = withProps()();

export const Root = hot(module)(connect(class extends Component<typeof props> {
  public render() {
    const styleSheet = StyleSheet.create({
      body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }
    });

    return (
      <div className={css(styleSheet.body)}>
        <Notifications/>
        <Switch>
          <Route path="/admin" component={Private}/>
          <Route path="/" component={Public}/>
        </Switch>
      </div>
    );
  }
}));
