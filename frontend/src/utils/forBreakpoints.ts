import { CSSProperties } from 'react';

import { forBreakpoint } from './forBreakpoint';
import { BREAKPOINTS } from '../constants';

export const forBreakpoints =
  <T, B extends keyof typeof BREAKPOINTS>(breakpoints: { [N in B]?: T },
                                          getProperties: (breakpoint: B, value: T) => CSSProperties) => {
    let properties: CSSProperties = {};

    for (let breakpoint in breakpoints) {
      if (breakpoints.hasOwnProperty(breakpoint)) {
        properties = {
          ...properties,
          ...forBreakpoint(breakpoint, getProperties(breakpoint, (breakpoints as any)[breakpoint]))
        };
      }
    }

    return properties;
  };
