import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { Component, Fragment } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';

import { AdminPage } from '../components/AdminPage';
import { BlockDrag } from '../components/BlockDrag';
import { Column } from '../components/Column';
import { DropZone } from '../components/DropZone';
import { Row } from '../components/Row';
import { BLOCK_RENDERERS, PHONE } from '../constants';
import { content } from '../modules/content';
import { State } from '../types';
import { findByKey } from '../utils/findByKey';
import { findByValue } from '../utils/findByValue';
import { withProps } from '../utils/withProps';

type Params = {
  id: string
};

const mapStateToProps = (state: State) => ({
  pages: state.content.pages,
  contentBlocks: state.content.contentBlocks,
  queue: state.http
});

const getActionCreators = () => ({
  getContentBlocks: content.getContentBlocks,
  push
});

const { props, connect } = withProps<{}, RouteComponentProps<Params>>()(mapStateToProps, getActionCreators);

export const PageContent = DragDropContext(HTML5Backend)(connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { pages, contentBlocks } = this.props;
    const { getContentBlocks, push } = this.props;

    const pageId = Number(id);

    if (isNaN(pageId) || !findByValue(pageId, 'id', pages!)) {
      push('/admin/pages');
    }

    const pageBlocks = contentBlocks[pageId];

    if (!pageBlocks) {
      getContentBlocks({ pageId });
    }
  }

  public render() {
    const { match: { params: { id } } } = this.props;
    const { pages, contentBlocks, queue } = this.props;

    const styleSheet = StyleSheet.create({
      page: {
        margin: '.5rem .5rem .5rem 0',
        padding: '1rem',
        borderRadius: '.5rem',
        backgroundColor: '#fff'
      }
    });

    const page = findByValue(+id, 'id', pages!);

    if (!page) {
      return false;
    }

    const blocks = contentBlocks[page.id];

    if (queue.page || !blocks) {
      return false;
    }

    return (
      <AdminPage title="Pagina inhoud" padding={false}>
        <Row>
          <Column breakpoints={{ [PHONE]: 3 }}>
            <BlockDrag type="text" data={{ text: 'tekst', mode: 0 }}/>
            <BlockDrag type="button" data={{ text: 'knop', type: 0, target: 0 }}/>
            <BlockDrag type="column" data={{ size: 3, breakpoint: 0 }}/>
            <BlockDrag
              type="hero"
              data={{
                image:
                  'https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&w=1920',
                alignment: 0,
                height: 50
              }}
            />
          </Column>
          <Column breakpoints={{ [PHONE]: 9 }}>
            <div className={css(styleSheet.page)}>
              <DropZone page={page.id} order={0}/>
              {blocks
                .sort((a, b) => a.order - b.order)
                .map((block) => {
                  const renderer = findByKey(block.type, BLOCK_RENDERERS);

                  if (!renderer) {
                    return false;
                  }

                  return (
                    <Fragment key={block.id}>
                      {renderer(block, (data?: number) => (
                        <DropZone page={page.id} parent={block.id} parentData={data}/>
                      ))}
                      <DropZone page={page.id} order={block.order + 1}/>
                    </Fragment>
                  );
                })}
            </div>
          </Column>
        </Row>
      </AdminPage>
    );
  }
}));
