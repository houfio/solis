import * as React from 'react';
import { Component } from 'react';

import { createRenderer } from '../utils/createRenderer';
import { RendererProps } from '../types';
import { Button } from '../components/Button';

export const button = createRenderer(class extends Component<RendererProps<'button'>> {
  public render() {
    const { data: { text, type } } = this.props;

    return (
      <Button text={text} type={type}/>
    );
  }
});
