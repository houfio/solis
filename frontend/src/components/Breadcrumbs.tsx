import * as React from 'react';
import { Component } from 'react';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';

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

    const routes = location.pathname
      .split('/')
      .slice(1)
      .reduce<string[]>(
        (previous, current) => ([
          ...previous,
          `${previous.join('/')}/${current}`
        ]),
        []
      )
      .map((path, index, array) => {
        const page = findByValue(path, 'path', pages);

        if (!page) {
          return 'Onbekend';
        }

        return index === array.length - 1 ? (
          <span key={page.id}>{page.name}</span>
        ) : (
          <a key={page.id}>{page.name}</a>
        );
      });

    return (
      <span>{routes}</span>
    );
  }
});
