import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { Query } from 'react-apollo';

import { BLACK, GRAY, WHITE } from '../constants';
import { content } from '../modules/content';
import { BreadcrumbsQuery } from '../schema/__generated__/BreadcrumbsQuery';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { withProps } from '../utils/withProps';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';
import { RouterContextConsumer } from './RouterContextConsumer';

import query from '../schema/breadcrumbs.graphql';

const mapStateToProps = (state: State) => ({
  breadcrumbs: state.content.breadcrumbs
});

const getActionCreators = () => ({
  toggleBreadcrumbs: content.toggleBreadcrumbs
});

const { props, connect } = withProps()(mapStateToProps, getActionCreators);

export const Breadcrumbs = connect(class extends Component<typeof props> {
  public render() {
    const { breadcrumbs } = this.props;

    const styleSheet = StyleSheet.create({
      breadcrumbs: {
        position: 'absolute',
        width: '100%',
        padding: '1rem 0',
        color: BLACK,
        backgroundColor: WHITE,
        border: `1px solid ${GRAY}`,
        borderRadius: '0 0 .5rem .5rem',
        transform: breadcrumbs ? '' : 'translateY(-3.5rem)',
        transition: 'transform .2s ease',
        zIndex: -1,
        lineHeight: 1
      }
    });

    return (
      <Query<BreadcrumbsQuery> query={query}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'loading haha';
          } else if (error || !data) {
            console.log(error);

            return false;
          }

          return (
            <RouterContextConsumer>
              {({ location: { pathname } }) => {
                let paths = pathname
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
                        <Breadcrumb
                          key={index}
                          page={findByValue(path, 'path', data.pages)}
                          last={index === array.length - 1}
                        />
                      ))}
                    </Container>
                  </div>
                );
              }}
            </RouterContextConsumer>
          );
        }}
      </Query>
    );
  }
});
