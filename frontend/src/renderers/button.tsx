import * as React from 'react';

import { createRenderer } from '../utils/createRenderer';

export const button = createRenderer<'button'>((key, data) => (
  <button key={key}>{data.text} ({data.type})</button>
));
