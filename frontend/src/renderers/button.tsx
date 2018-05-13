import * as React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';

import { Button } from '../components/Button';
import { ContentPageQuery_page_blocks_data_Button } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';
import { withProps } from '../utils/withProps';

const getActionCreators = () => ({
  push
});

const {
  props,
  connect
} = withProps<RendererProps<ContentPageQuery_page_blocks_data_Button>>()(undefined, getActionCreators);

export const button = createRenderer(connect(class extends Component<typeof props> {
  public render() {
    const { data: { text, type } } = this.props;

    return (
      <Button
        text={text}
        type={type === 0 ? 'primary' : 'secondary'}
        onClick={this.navigateToTarget}
      />
    );
  }

  private navigateToTarget = () => {
    const { data: { target: { path } } } = this.props;
    const { push } = this.props;

    push(path);
  }
}));
