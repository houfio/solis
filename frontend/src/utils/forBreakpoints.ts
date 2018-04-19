import { CSSProperties } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { forBreakpoint } from './forBreakpoint';

export const forBreakpoints =
  <T, B extends keyof typeof BREAKPOINTS>(breakpoints: { [N in B]?: T },
                                          getProperties: (value: T, breakpoint: B) => CSSProperties) => {
    let properties: CSSProperties = {};

    for (const breakpoint in breakpoints) {
      if (breakpoints.hasOwnProperty(breakpoint)) {
        properties = {
          ...properties,
          ...forBreakpoint(breakpoint, getProperties(breakpoints[breakpoint] as T, breakpoint))
        };
      }
    }

    return properties;
  };
