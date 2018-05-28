import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';

import { GRAY, WHITE } from '../constants';
import { content } from '../modules/content';
import { PublicQuery_pages } from '../schema/__generated__/PublicQuery';
import { State } from '../types';
import { findByValue } from '../utils/findByValue';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';

type Props = {
  pages: PublicQuery_pages[]
};

const mapStateToProps = (state: State) => ({
  location: state.router.location,
  breadcrumbs: state.content.breadcrumbs
});

const getActionCreators = () => ({
  toggleBreadcrumbs: content.toggleBreadcrumbs
});

const { props, connect } = withProps<Props>()(mapStateToProps, getActionCreators);

export const Breadcrumbs = connect(class extends Component<typeof props> {
  public render() {
    const { pages } = this.props;
    const { location, breadcrumbs } = this.props;
    const { toggleBreadcrumbs } = this.props;

    if (!location) {
      return false;
    }

    const styleSheet = StyleSheet.create({
      breadcrumbs: {
        position: 'absolute',
        width: '100%',
        padding: '1.5rem 0 1rem 0',
        backgroundColor: WHITE,
        border: `1px solid ${GRAY}`,
        borderRadius: '0 0 .5rem .5rem',
        transform: breadcrumbs ? '' : 'translateY(-3.5rem)',
        transition: 'transform .2s ease',
        zIndex: 1,
        lineHeight: 1
      },
      arrow: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        bottom: 0,
        height: '15px',
        width: '100%',
        cursor: 'pointer',
        '::after': {
          content: '""',
          display: 'block',
          width: '25px',
          height: '4px',
          borderRadius: '4px',
          marginBottom: '-1px',
          backgroundColor: 'rgba(0, 0, 0, .9)'
        }
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
        {false && (
          <div className={css(styleSheet.arrow)} onClick={handle(toggleBreadcrumbs, undefined)}/>
        )}
      </div>
    );
  }
});
