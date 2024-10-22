import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Fragment } from 'react';
import { Query } from 'react-apollo';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { RouteComponentProps } from 'react-router';

import { AdminPage } from '../components/AdminPage';
import { Column } from '../components/Column';
import { ContentBlockSource } from '../components/ContentBlockSource';
import { ContentBlockTarget } from '../components/ContentBlockTarget';
import { Row } from '../components/Row';
import { BLOCK_RENDERERS, blockPreviews, GRAY, PHONE, WHITE } from '../constants';
import { RouterConsumer } from '../context/router';
import { PageContentQuery, PageContentQueryVariables } from '../schema/__generated__/PageContentQuery';
import { findByKey } from '../utils/findByKey';

import query from '../schema/pageContent.graphql';

type Params = {
  id: string
};

type Props = RouteComponentProps<Params>;

const styleSheet = StyleSheet.create({
  sidebar: {
    backgroundColor: WHITE,
    padding: '0 2rem 1px',
    height: 'calc(100vh - 8rem)',
    overflowY: 'scroll'
  },
  page: {
    position: 'relative'
  },
  block: {
    borderRadius: '.5rem',
    border: `1px solid ${GRAY}`,
    padding: '1rem'
  }
});

export const EditPage = DragDropContext(HTML5Backend)(({ match: { params: { id } } }: Props) => (
  <Query<PageContentQuery, PageContentQueryVariables> query={query} variables={{ id }}>
    {({ data, loading }) => (
      <RouterConsumer>
        {({ history: { push } }) => {
          if (loading || !data) {
            return <span>'loading haha'</span>;
          } else if (!data.page) {
            push('/admin/pages');

            return null;
          }

          return (
            <AdminPage title="Pagina inhoud" padding={false}>
              <Row>
                <Column breakpoints={{ [PHONE]: 3 }}>
                  <div className={css(styleSheet.sidebar)}>
                    {Object.entries(blockPreviews).map(([key, value]) => (
                      <ContentBlockSource
                        key={key}
                        type={key}
                        data={value.preview}
                        fields={value.fields}
                      />
                    ))}
                  </div>
                </Column>
                <Column breakpoints={{ [PHONE]: 9 }}>
                  <div className={css(styleSheet.page)}>
                    <ContentBlockTarget pageId={data.page.id} order={0}/>
                    {[...data.page.blocks]
                      .sort((a, b) => a.order! - b.order!)
                      .map((block) => {
                        const renderer = findByKey(block.type, BLOCK_RENDERERS);
                        const children = data.page!.blocks.filter((b) => b.parent && b.parent.id === block.id);

                        if (!renderer) {
                          return false;
                        }

                        return (
                          <Fragment key={block.id}>
                            <div className={css(styleSheet.block)}>
                              {renderer(block as any, children, (order) => (
                                <ContentBlockTarget pageId={data.page!.id} order={order}/>
                              ))}
                            </div>
                            <ContentBlockTarget pageId={data.page!.id} order={block.order! + 1}/>
                          </Fragment>
                        );
                      })}
                  </div>
                </Column>
              </Row>
            </AdminPage>
          );
        }}
      </RouterConsumer>
    )}
  </Query>
));
