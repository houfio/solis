import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';

import { AdminPage } from '../components/AdminPage';
import { BlockDrag } from '../components/BlockDrag';
import { Column } from '../components/Column';
import { DropZone } from '../components/DropZone';
import { Row } from '../components/Row';
import { BLOCK_RENDERERS, PHONE, WHITE } from '../constants';
import { PageContentQuery, PageContentQueryVariables } from '../schema/__generated__/PageContentQuery';
import { findByKey } from '../utils/findByKey';
import { withProps } from '../utils/withProps';

import query from '../schema/pageContent.graphql';

type Params = {
  id: string
};

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(undefined, getActionCreators);

export const PageContent = DragDropContext(HTML5Backend)(connect(class extends Component<typeof props> {
  public render() {
    const { match: { params: { id } } } = this.props;
    const { push } = this.props;

    const styleSheet = StyleSheet.create({
      sidebar: {
        backgroundColor: WHITE,
        padding: '0 2rem 1px',
        height: 'calc(100vh - 8rem)',
        overflowY: 'scroll'
      },
      page: {
        padding: '1rem',
        position: 'relative'
      }
    });

    return (
      <Query<PageContentQuery, PageContentQueryVariables> query={query} variables={{ id }}>
        {({ data, loading }) => {
          if (loading || !data) {
            return 'loading haha';
          } else if (!data.page) {
            push('/admin/pages');

            return;
          }

          return (
            <AdminPage title="Pagina inhoud" padding={false}>
              <Row>
                <Column breakpoints={{ [PHONE]: 3 }}>
                  <div className={css(styleSheet.sidebar)}>
                    <BlockDrag type="text" data={{ text: 'tekst', mode: 0 }}/>
                    <BlockDrag type="button" data={{ text: 'knop', type: 0, target: 0 }}/>
                    <BlockDrag type="column" data={{ size: 3, breakpoint: 0 }}/>
                    <BlockDrag
                      type="hero"
                      data={{
                        image: 'https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?w=1920',
                        alignment: 0,
                        height: 50
                      }}
                    />
                  </div>
                </Column>
                <Column breakpoints={{ [ PHONE ]: 9 }}>
                  <div className={css(styleSheet.page)}>
                    <DropZone pageId={data.page.id} order={0}/>
                    {[ ...data.page.blocks ]
                      .sort((a, b) => a.order - b.order)
                      .map((block) => {
                        const renderer = findByKey(block.type, BLOCK_RENDERERS);

                        if (!renderer) {
                          return false;
                        }

                        return (
                          <Fragment key={block.id}>
                            {renderer(block as any)}
                            <DropZone pageId={data.page!.id} order={block.order + 1}/>
                          </Fragment>
                        );
                      })}
                  </div>
                </Column>
              </Row>
            </AdminPage>
          );
        }}
      </Query>
    );
  }
}));
