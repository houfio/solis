import { Component } from 'react';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { content } from '../modules/content';
import { findByValue } from '../utils/findByValue';
import { findByKey } from '../utils/findByKey';
import { BLOCK_RENDERERS } from '../constants';

type Props = {
  pageId: number
}

const mapStateToProps = (state: State) => ({
  pages: state.content.pages,
  contentBlocks: state.content.contentBlocks,
  queue: state.http.queue
});

const getActionCreators = () => ({
  getContentBlocks: content.getContentBlocks
});

const { props, connect } = withProps<Props>()(mapStateToProps, getActionCreators);

export const ContentPage = connect(class extends Component<typeof props> {
  public componentDidMount() {
    const { pageId } = this.props;
    const { contentBlocks } = this.props;
    const { getContentBlocks } = this.props;

    const pageBlocks = contentBlocks[pageId];

    if (!pageBlocks) {
      getContentBlocks({ pageId });
    }
  }

  public render() {
    const { pageId } = this.props;
    const { pages, contentBlocks } = this.props;

    if (!pages) {
      return false;
    }

    const page = findByValue(pageId, 'id', pages);
    const pageBlocks = contentBlocks[pageId];

    if (!page || !pageBlocks) {
      return false;
    }

    return pageBlocks.map(block => {
      const renderer = findByKey(block.type, BLOCK_RENDERERS);

      if (!renderer) {
        return false;
      }

      return renderer(block, block.id);
    });
  }
});
