import * as React from 'react';
import { Component } from 'react';

import { Column } from '../components/Column';
import { Row } from '../components/Row';
import { BREAKPOINTS } from '../constants';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';
import { findByIndex } from '../utils/findByIndex';
import { findByValue } from '../utils/findByValue';

export const column = createRenderer(class extends Component<RendererProps<'column'>> {
  public render() {
    const { data: { size, breakpoint }, drop, children } = this.props;

    const [namedBreakpoint] = findByIndex(breakpoint, BREAKPOINTS);

    return (
      <Row>
        {Array.from(new Array(size)).map((_, index) => {
          const child = findByValue(index, 'data', children);

          return (
            <Column key={index} breakpoints={{ [namedBreakpoint]: 12 / size }}>
              {child ? child.render() : drop(index)}
            </Column>
          );
        })}
      </Row>
    );
  }
});
