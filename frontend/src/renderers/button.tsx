import * as React from 'react';
import { Component } from 'react';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps } from '../types';

export const button = createRenderer(class extends Component<RendererProps<'button'>> {
  public render() {
    const { data: { text, type } } = this.props;

    return (
      <button>{text} ({type})</button>
    );
  }
});
