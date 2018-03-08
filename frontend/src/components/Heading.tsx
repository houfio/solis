import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { forBreakpoints } from '../utils/forBreakpoints';
import { HeadingTypes } from '../types';

type Props = {
  text: string,
  breakpoints: { [B in keyof typeof BREAKPOINTS]?: HeadingTypes },
  styles?: CSSProperties[]
}

const headingSizes: { [T in HeadingTypes]: CSSProperties } = {
  bold: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: '.5rem'
  },
  thin: {
    fontSize: '1.5rem',
    marginBottom: '.5rem'
  },
  subtle: {
    fontSize: '.75rem',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, .60)',
    margin: '-.5rem 0 .5rem 0'
  }
};

export const Heading = ({ text, breakpoints, styles = [] }: Props) => {
  const styleSheet = StyleSheet.create({
    heading: {
      display: 'block',
      ...forBreakpoints(breakpoints, value => headingSizes[value])
    }
  });

  return (
    <span className={css(styleSheet.heading, styles)}>
      {text}
    </span>
  );
};
