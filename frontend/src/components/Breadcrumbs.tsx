import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { BLACK, GRAY, WHITE } from '../constants';
import { content } from '../modules/content';
import { NavigationQuery_pages } from '../schema/__generated__/NavigationQuery';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { withProps } from '../utils/withProps';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';
import { RouterContextConsumer } from './RouterContextConsumer';

type Props = {
  pages: NavigationQuery_pages[]
};

const mapStateToProps = (state: State) => ({
  breadcrumbs: state.content.breadcrumbs
});

const getActionCreators = () => ({
  toggleBreadcrumbs: content.toggleBreadcrumbs
});

const { props, connect } = withProps<Props>()(mapStateToProps, getActionCreators);

export const Breadcrumbs = connect(class extends Component<typeof props> {
  public render() {
    const { pages } = this.props;
    const { breadcrumbs } = this.props;

    const styleSheet = StyleSheet.create({
      breadcrumbs: {
        position: 'absolute',
        width: '100%',
        padding: '1rem 0',
        color: BLACK,
        backgroundColor: WHITE,
        border: `1px solid ${GRAY}`,
        borderTop: 'none',
        borderRadius: '0 0 .5rem .5rem',
        transform: breadcrumbs ? '' : 'translateY(-3.5rem)',
        transition: 'transform .2s ease',
        zIndex: -1,
        lineHeight: 1
      }
    });

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
                    page={findByValue(path, 'path', pages)}
                    last={index === array.length - 1}
                  />
                ))}
              </Container>
            </div>
          );
        }}
      </RouterContextConsumer>
    );
  }
});
