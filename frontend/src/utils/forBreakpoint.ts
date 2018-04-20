import { CSSProperties } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { Breakpoint } from '../types';

export const forBreakpoint = (breakpoint: Breakpoint, style: CSSProperties) => {
  const size = BREAKPOINTS[breakpoint];

  if (size !== '0') {
    return {
      ['@media (min-width: ' + size + ')']: style
    };
  }

  return style;
};
