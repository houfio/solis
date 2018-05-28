import * as React from 'react';
import { Component } from 'react';

import { Button } from '../components/Button';
import { RouterContextConsumer } from '../components/RouterContextConsumer';
import { ContentPageQuery_page_blocks_data_Button } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';
import { withProps } from '../utils/withProps';

const { props, connect } = withProps<RendererProps<ContentPageQuery_page_blocks_data_Button>>()();

export const button = createRenderer(connect(class extends Component<typeof props> {
  public render() {
    const { data: { text, type, target: { path } } } = this.props;

    return (
      <RouterContextConsumer>
        {({ history: { push } }) => {
          const navigateTo = () => {
            push(path);
          };

          return (
            <Button
              text={text}
              type={type === 0 ? 'primary' : 'secondary'}
              onClick={navigateTo}
            />
          );
        }}
      </RouterContextConsumer>
    );
  }
}));
