import { hot } from 'react-hot-loader'; // tslint:disable-next-line
import { css, StyleSheet } from 'aphrodite/no-important';
import { createLocation } from 'history';
import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router';

import { Notifications } from '../components/Notifications';
import { State } from '../types';
import { withProps } from '../utils/withProps';
import { Private } from './Private';
import { Public } from './Public';

const mapStateToProps = (state: State) => ({
  location: state.router.location
});

const { props, connect } = withProps()(mapStateToProps);

export const Root = hot(module)(connect(class extends Component<typeof props> {
  public render() {
    const { location } = this.props;

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
        <Switch location={location || createLocation(window.location.href)}>
          <Route path="/admin" component={Private}/>
          <Route path="/" component={Public}/>
        </Switch>
      </div>
    );
  }
}));
