import { faPlus } from '@fortawesome/fontawesome-free-solid/faPlus';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component } from 'react';
import { Query } from 'react-apollo';

import { AdminAction } from '../components/AdminAction';
import { AdminPage } from '../components/AdminPage';
import { Heading } from '../components/Heading';
import { RouterContextConsumer } from '../components/RouterContextConsumer';
import { PHONE, PURPLE, PURPLE_ACCENT } from '../constants';
import { PagesQuery } from '../schema/__generated__/PagesQuery';
import { withProps } from '../utils/withProps';

import query from '../schema/pages.graphql';

const { props, connect } = withProps()();

export const Pages = connect(class extends Component<typeof props> {
  public render() {
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

    return (
      <Query<PagesQuery> query={query}>
        {({ data, loading, error }) => {
          if (loading) {
            return 'loading haha';
          } else if (error || !data) {
            console.log(error);

            return false;
          }

          return (
            <RouterContextConsumer>
              {({ history: { push } }) => (
                <AdminPage
                  title="Pagina's"
                  actions={[
                    <AdminAction key="0" icon={faPlus}/>
                  ]}
                >
                  {data.pages.map((page: {
                    id: string,
                    name: string
                  }) => {
                    const navigateTo = () => {
                      push(`/admin/pages/${page.id}`);
                    };

                    return (
                      <div
                        key={page.id}
                        className={css(stylesheet.header)}
                        onClick={navigateTo}
                      >
                        <Heading
                          text={page.name}
                          light={true}
                          breakpoints={{ [ PHONE ]: 'thin' }}
                          styles={[ stylesheet.heading ]}
                        />
                      </div>
                    );
                  })}
                </AdminPage>
              )}
            </RouterContextConsumer>
          );
        }}
      </Query>
    );
  }
});
