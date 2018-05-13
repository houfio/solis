import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { PublicQuery_pages } from '../schema/__generated__/PublicQuery';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { withProps } from '../utils/withProps';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';

type Props = {
  pages: PublicQuery_pages[]
};

const mapStateToProps = (state: State) => ({
  location: state.router.location
});

const { props, connect } = withProps<Props>()(mapStateToProps);

export const Breadcrumbs = connect(class extends Component<typeof props> {
  public render() {
    const { pages } = this.props;
    const { location } = this.props;

    if (!location) {
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
          `${previous[ index - 1 ] || ''}/${current}`
        ]),
        []
      );

    if (paths[ 0 ] !== '/') {
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
