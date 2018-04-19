import * as React from 'react';
import { Component } from 'react';

import { Column } from '../components/Column';
import { Row } from '../components/Row';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';

export const column = createRenderer(class extends Component<RendererProps<'column'>> {
  public render() {
    const { children, data: { size, breakpoint } } = this.props;

    const childSize = 12 / size;
    let lastColumn = 0;

    return (
      <Row>
        {children
          .sort((a, b) => a.order - b.order)
          .map((child) => {
            const index = child.data;
            let offset = 0;

            if (index - 1 > lastColumn) {
              offset = (index - lastColumn - 1) * childSize;
            }

            lastColumn = index;

            return (
              <Column key={index} breakpoints={{ [breakpoint]: { size: childSize, offset } }}>
                {child.render()}
              </Column>
            );
          })}
      </Row>
    );
  }
});
