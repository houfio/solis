import { faPlus } from '@fortawesome/fontawesome-free-solid/faPlus';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Query } from 'react-apollo';

import { AdminAction } from '../components/AdminAction';
import { AdminPage } from '../components/AdminPage';
import { Heading } from '../components/Heading';
import { PHONE, PURPLE, PURPLE_ACCENT } from '../constants';
import { RouterConsumer } from '../context/router';
import { PagesQuery } from '../schema/__generated__/PagesQuery';
import { Push } from '../types';

import query from '../schema/pages.graphql';

const stylesheet = StyleSheet.create({
  header: {
    padding: '2rem',
    borderRadius: '.5rem',
    background: `linear-gradient(145deg, ${PURPLE} 0%, ${PURPLE_ACCENT} 100%)`,
    lineHeight: 1,
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'opacity .2s ease',
    ':hover': {
      opacity: .9
    }
  },
  heading: {
    marginBottom: 0
  }
});

const navigateTo = (push: Push, id: string) => () => {
  push(`/admin/pages/${id}`);
};

export const Pages = () => (
  <Query<PagesQuery> query={query}>
    {({ data, loading, error }) => {
      if (loading) {
        return 'loading haha';
      } else if (error || !data) {
        console.log(error);

        return false;
      }

      return (
        <RouterConsumer>
          {({ history: { push } }) => (
            <AdminPage
              title="Pagina's"
              actions={[
                <AdminAction key="0" icon={faPlus}/>
              ]}
            >
              {data.pages.map((page) => (
                <div
                  key={page.id}
                  className={css(stylesheet.header)}
                  onClick={navigateTo(push, page.id)}
                >
                  <Heading
                    text={page.name}
                    light={true}
                    breakpoints={{ [ PHONE ]: 'thin' }}
                    styles={[ stylesheet.heading ]}
                  />
                </div>
              ))}
            </AdminPage>
          )}
        </RouterConsumer>
      );
    }}
  </Query>
);
