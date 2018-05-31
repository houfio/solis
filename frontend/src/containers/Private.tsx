import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router';

import { Sidebar } from '../components/Sidebar';
import { State } from '../types';
import { withProps } from '../utils/withProps';
import { Dashboard } from './Dashboard';
import { EditPage } from './EditPage';
import { Page } from './Page';
import { Pages } from './Pages';

const mapStateToProps = (state: State) => ({
  collapsed: state.admin.collapsed
});

const { props, connect } = withProps()(mapStateToProps);

export const Private = connect(class extends Component<typeof props> {
  public render() {
    const { collapsed } = this.props;

    const stylesheet = StyleSheet.create({
      main: {
        width: '100%',
        paddingLeft: collapsed ? '75px' : '300px',
        transition: 'padding .2s ease'
      }
    });

    return (
      <>
        <Helmet title={`Admin / Jong Nederland`}/>
        <Sidebar/>
        <main className={css(stylesheet.main)}>
          <Route path="/admin" exact={true} component={Dashboard}/>
          <Route path="/admin/pages" exact={true} component={Pages}/>
          <Route path="/admin/pages/:id" exact={true} component={Page}/>
          <Route path="/admin/pages/:id/content" exact={true} component={EditPage}/>
        </main>
      </>
    );
  }
});
