import { css, StyleSheet } from 'aphrodite/no-important';
import { createLocation } from 'history';
import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router';

import { Notifications } from '../components/Notifications';
import { Spinner } from '../components/Spinner';
import { auth } from '../modules/auth';
import { content } from '../modules/content';
import { State } from '../types';
import { withProps } from '../utils/withProps';
import { Private } from './Private';
import { Public } from './Public';

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  pages: state.content.pages,
  queue: state.http,
  token: state.auth.token
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
        <>
          <Notifications/>
          <Spinner/>
        </>
      );
    }

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
});
