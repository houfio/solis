import { faPlus } from '@fortawesome/fontawesome-free-solid/faPlus';
import { css, StyleSheet } from 'aphrodite/no-important';
import gql from 'graphql-tag';
import * as React from 'react';
import { Component } from 'react';
import { Query } from 'react-apollo';
import { push } from 'react-router-redux';

import { Action } from '../components/Action';
import { AdminPage } from '../components/AdminPage';
import { Heading } from '../components/Heading';
import { PHONE } from '../constants';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps()(undefined, getActionCreators);

export const Pages = connect(class extends Component<typeof props> {
  public render() {
    const { push } = this.props;

    const stylesheet = StyleSheet.create({
      header: {
        padding: '2rem',
        borderRadius: '.5rem',
        background: 'linear-gradient(145deg, #0094FF 0%, #12589d 100%)',
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
      <Query
        query={gql`
          {
            pages {
              id
              name
            }
          }
        `}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return 'loading haha';
          } else if (error) {
            console.log(error);

            return false;
          }

          return (
            <AdminPage
              title="Pagina's"
              actions={[
                <Action key="0" icon={faPlus}/>
              ]}
            >
              {data.pages.map((page: {
                id: string,
                name: string
              }) => (
                <div
                  key={page.id}
                  className={css(stylesheet.header)}
                  onClick={handle(push, `/admin/pages/${page.id}`)}
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
          );
        }}
      </Query>
    );
  }
});
