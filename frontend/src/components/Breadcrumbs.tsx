import * as React from 'react';
import { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { Container } from './Container';
import { Breadcrumb } from './Breadcrumb';

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  pages: state.content.pages
});

const { props, connect } = withProps()(mapStateToProps);

export const Breadcrumbs = connect(class extends Component<typeof props> {
  public render() {
    const { location, pages } = this.props;

    if (!location || !pages) {
      return false;
    }

    const styleSheet = StyleSheet.create({
      breadcrumbs: {
        padding: '1rem 0',
        backgroundColor: '#F6F6F6'
      }
    });

    let paths = location.pathname
      .split('/')
      .slice(1)
      .reduce<string[]>(
        (previous, current, index) => ([
          ...previous,
          `${previous[index - 1] || ''}/${current}`
        ]),
        []
      );

    if (paths[0] !== '/') {
      paths = [
        '/',
        ...paths
      ];
    }

    return (
      <div className={css(styleSheet.breadcrumbs)}>
        <Container>
          {paths.map((path, index, array) => (
            <Breadcrumb key={index} page={findByValue(path, 'path', pages)} last={index === array.length - 1}/>
          ))}
        </Container>
      </div>
    );
  }
});
