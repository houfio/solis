import * as React from 'react';

import { createRenderer } from '../utils/createRenderer';

export const text = createRenderer<'text'>((key, data) => (
  <span key={key}>{data.text}</span>
));
