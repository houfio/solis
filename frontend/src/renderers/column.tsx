import * as React from 'react';
import { Component } from 'react';

import { createRenderer } from '../utils/createRenderer';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { PHONE } from '../constants';
import { RendererProps } from '../types';

export const column = createRenderer(class extends Component<RendererProps<'column'>> {
  public render() {
    const { children } = this.props;

    return (
      <Row>
        {children.map((child, index) => (
          <Column key={index} breakpoints={{ [PHONE]: child.data }}>
            {child.render()}
          </Column>
        ))}
      </Row>
    );
  }
});
