import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router';

import { Sidebar } from '../components/Sidebar';
import { State } from '../types';
import { withProps } from '../utils/withProps';
import { Dashboard } from './Dashboard';
import { Pages } from './Pages';

const mapStateToProps = (state: State) => ({
  collapsed: state.admin.collapsed
});

const { props, connect } = withProps()(mapStateToProps);

export const Private = connect(class extends Component<typeof props> {
  public render() {
    const { collapsed } = this.props;

    const stylesheet = StyleSheet.create({
      admin: {
        display: 'flex',
        height: '100vh'
      },
      main: {
        width: '100%',
        paddingLeft: collapsed ? '75px' : '300px',
        transition: 'padding .2s ease'
      }
    });

    return (
      <div className={css(stylesheet.admin)}>
        <Helmet title={`Admin / Jong Nederland`}/>
        <Sidebar/>
        <main className={css(stylesheet.main)}>
          <Route path="/admin" exact={true} component={Dashboard}/>
          <Route path="/admin/pages" exact={true} component={Pages}/>
        </main>
      </div>
    );
  }
});
