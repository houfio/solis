import * as React from 'react';
import { Component } from 'react';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps } from '../types';

export const text = createRenderer(class extends Component<RendererProps<'text'>> {
  public render() {
    const { data: { text } } = this.props;

    return (
      <span>{text}</span>
    )
  }
});
