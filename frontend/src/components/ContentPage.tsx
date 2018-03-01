import { Component } from 'react';

import { withProps } from '../utils/withProps';
import { State } from '../types';
import { content } from '../modules/content';
import { findById } from '../utils/findById';
import { findRenderer } from '../utils/findRenderer';

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
    const { pages, contentBlocks, queue } = this.props;

    if (queue.page) {
      return 'loading page';
    }

    if (!pages) {
      return false;
    }

    const page = findById(pageId, pages);

    if (!page) {
      return false;
    }

    const pageBlocks = contentBlocks[pageId];

    if (!pageBlocks) {
      return '?';
    }

    return pageBlocks.map((block, index) => {
      const renderer = findRenderer(block);

      if (!renderer) {
        return false;
      }

      return renderer(block, index);
    });
  }
});
