import * as React from 'react';
import { Component } from 'react';
import { push } from 'react-router-redux';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps, State } from '../types';
import { Button } from '../components/Button';
import { withProps } from '../utils/withProps';
import { findByValue } from '../utils/findByValue';

const mapStateToProps = (state: State) => ({
  pages: state.content.pages
});

const getActionCreators = () => ({
  push
});

const { props, connect } = withProps<RendererProps<'button'>>()(mapStateToProps, getActionCreators);

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
    const { data: { target } } = this.props;
    const { pages } = this.props;
    const { push } = this.props;

    if (!pages) {
      return;
    }

    const page = findByValue(target, 'id', pages);

    if (!page) {
      return;
    }

    push(page.path);
  };
}));
