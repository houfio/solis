import { CSSProperties } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';

export const forBreakpoint = (breakpoint: keyof typeof BREAKPOINTS, style: CSSProperties) => {
  const size = BREAKPOINTS[breakpoint];

  if (size !== '0') {
    return {
      ['@media (min-width: ' + size + ')']: style
    };
  }

  return style;
};
