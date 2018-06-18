import * as React from 'react';

import { Column } from '../components/Column';
import { Row } from '../components/Row';
import { BREAKPOINTS } from '../constants';
import { ContentPageQuery_page_blocks_data_Column } from '../schema/__generated__/ContentPageQuery';
import { RendererProps } from '../types';
import { createRenderer } from '../utils/createRenderer';
import { findByIndex } from '../utils/findByIndex';
import { findByValue } from '../utils/findByValue';

type Props = RendererProps<ContentPageQuery_page_blocks_data_Column>;

export const column = createRenderer(({ data: { size, breakpoint }, children, drop }: Props) => {
  const [ namedBreakpoint ] = findByIndex(breakpoint, BREAKPOINTS);

  return (
    <Row>
      {Array.from(new Array(size)).map((_, index) => {
        const child = findByValue(index, 'data', children);

        return (
          <Column key={index} breakpoints={{ [ namedBreakpoint ]: 12 / size }}>
            {child ? child.render() : drop(index)}
          </Column>
        );
      })}
    </Row>
  );
});
