import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';

import { BLUE, RED } from '../constants';
import { PublicQuery_pages } from '../schema/__generated__/PublicQuery';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

type Props = {
  page?: PublicQuery_pages,
  last: boolean
};

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps<Props>()(undefined, getActionCreators);

export const Breadcrumb = connect(class extends Component<typeof props> {
  public render() {
    const { page, last } = this.props;
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      breadcrumb: {
        ':not(:last-child)::after': {
          content: '"/"',
          padding: '0 .5rem',
          color: BLUE,
          fontWeight: 'bold'
        }
      },
      link: {
        cursor: 'pointer',
        transition: 'opacity .2s ease',
        ':hover': {
          opacity: .5
        }
      },
      unknown: {
        color: RED
      }
    });

    return (
      <span className={css(styleSheet.breadcrumb)}>
        <a
          className={css(
            !last && page && styleSheet.link,
            !page && styleSheet.unknown
          )}
          onClick={page ? handle(push, page.path) : undefined}
        >
          {page ? page.name : 'Onbekend'}
        </a>
      </span>
    );
  }
});
