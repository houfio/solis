import { faArrowsAlt } from '@fortawesome/fontawesome-free-solid/faArrowsAlt';
import { faSave } from '@fortawesome/fontawesome-free-solid/faSave';
import { faTrash } from '@fortawesome/fontawesome-free-solid/faTrash';
import * as React from 'react';
import { Component } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import { AdminAction } from '../components/AdminAction';
import { AdminPage } from '../components/AdminPage';
import { PageSettings } from '../components/PageSettings';
import { RouterContextConsumer } from '../components/RouterContextConsumer';
import { GREEN, RED } from '../constants';
import { content } from '../modules/content';
import { PageQuery, PageQueryVariables } from '../schema/__generated__/PageQuery';
import { handle } from '../utils/handle';
import { withProps } from '../utils/withProps';

import query from '../schema/page.graphql';

type Params = {
  id: string
};

const getActionCreators = () => ({
  addNotification: content.addNotification
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(undefined, getActionCreators);

export const Page = connect(class extends Component<typeof props> {
  public render() {
    const { match: { params: { id } } } = this.props;
    const { addNotification } = this.props;

    return (
      <Query<PageQuery, PageQueryVariables> query={query} variables={{ id }}>
        {({ data, loading }) => (
          <RouterContextConsumer>
            {({ history: { push } }) => {
              if (loading || !data) {
                return <span>loading haha</span>;
              } else if (!data.page) {
                push('/admin/pages');

                return null;
              }

              const navigateTo = () => {
                push(`/admin/pages/${id}/content`);
              };

              return (
                <AdminPage
                  title="Pagina"
                  actions={[
                    <AdminAction
                      key="0"
                      icon={faSave}
                      onClick={handle(addNotification, () => ({
                        id: Date.now(),
                        text: 'Opgeslagen',
                        timeout: 1000
                      }))}
                      color={GREEN}
                    />,
                    <AdminAction key="1" icon={faArrowsAlt} onClick={navigateTo}/>,
                    <AdminAction key="2" icon={faTrash} color={RED}/>
                  ]}
                >
                  <PageSettings page={data.page}/>
                </AdminPage>
              );
            }}
          </RouterContextConsumer>
        )}
      </Query>
    );
  }
});
