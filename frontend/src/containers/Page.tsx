import { faArrowsAlt } from '@fortawesome/fontawesome-free-solid/faArrowsAlt';
import { faSave } from '@fortawesome/fontawesome-free-solid/faSave';
import { faTrash } from '@fortawesome/fontawesome-free-solid/faTrash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import { AdminAction } from '../components/AdminAction';
import { AdminPage } from '../components/AdminPage';
import { PageSettings } from '../components/PageSettings';
import { GREEN, RED } from '../constants';
import { RouterConsumer } from '../context/router';
import { PageQuery, PageQueryVariables } from '../schema/__generated__/PageQuery';

import query from '../schema/page.graphql';

type Params = {
  id: string
};

type Props = RouteComponentProps<Params>;

export const Page = ({ match: { params: { id } } }: Props) => (
  <Query<PageQuery, PageQueryVariables> query={query} variables={{ id }}>
    {({ data, loading }) => (
      <RouterConsumer>
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
      </RouterConsumer>
    )}
  </Query>
);
