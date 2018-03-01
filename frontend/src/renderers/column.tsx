import * as React from 'react';

import { createRenderer } from '../utils/createRenderer';
import { Row } from '../components/Row';
import { Column } from '../components/Column';
import { PHONE } from '../constants';

export const column = createRenderer<'column'>((key, data, children) => (
  <Row key={key}>
    {children.map((child, index) => (
      <Column key={index} breakpoints={{ [PHONE]: child.data }}>
        {child.render()}
      </Column>
    ))}
  </Row>
));
