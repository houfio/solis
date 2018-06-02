import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { BLUE, RED } from '../constants';
import { RouterConsumer } from '../context/router';
import { NavigationQuery_pages } from '../schema/__generated__/NavigationQuery';

type Props = {
  page?: NavigationQuery_pages,
  last: boolean
};

export const Breadcrumb = ({ page, last }: Props) => {
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
    <RouterConsumer>
      {({ history: { push } }) => {
        const navigateTo = () => {
          push(page!.path);
        };

        return (
          <span className={css(styleSheet.breadcrumb)}>
              <a
                className={css(
                  !last && page && styleSheet.link,
                  !page && styleSheet.unknown
                )}
                onClick={page ? navigateTo : undefined}
              >
                {page ? page.name : 'Onbekend'}
              </a>
            </span>
        );
      }}
    </RouterConsumer>
  );
};
