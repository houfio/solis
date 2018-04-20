import { CSSProperties } from 'aphrodite/no-important';

import { Breakpoint } from '../types';
import { forBreakpoint } from './forBreakpoint';

export const forBreakpoints =
  <T, B extends Breakpoint>(breakpoints: { [N in B]?: T },
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
