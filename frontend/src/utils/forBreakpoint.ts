import { CSSProperties } from 'react';

import { BREAKPOINTS } from '../constants';

export const forBreakpoint = (breakpoint: keyof typeof BREAKPOINTS, style: CSSProperties) => {
  let size = BREAKPOINTS[breakpoint];

  if (size !== '0') {
    return {
      ['@media (min-width: ' + size + ')']: style
    };
  }

  return style;
};
