import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { BLACK, GRAY, WHITE } from '../constants';
import { ContentConsumer } from '../context/content';
import { RouterConsumer } from '../context/router';
import { NavigationQuery_pages } from '../schema/__generated__/NavigationQuery';
import { findByValue } from '../utils/findByValue';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';

type Props = {
  pages: NavigationQuery_pages[]
};

export const Breadcrumbs = ({ pages }: Props) => (
  <ContentConsumer>
    {({ breadcrumbs }) => {
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
        <RouterConsumer>
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
        </RouterConsumer>
      );
    }}
  </ContentConsumer>
);
