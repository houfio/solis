import * as React from 'react';
import { CSSProperties } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { BREAKPOINTS } from '../constants';
import { forBreakpoints } from '../utils/forBreakpoints';
import { HeadingTypes } from '../types';

type Props = {
  text: string,
  light?: boolean,
  breakpoints: { [B in keyof typeof BREAKPOINTS]?: HeadingTypes },
  styles?: (CSSProperties | false)[]
}

const headingStyles = (light: boolean): { [T in HeadingTypes]: CSSProperties } => {
  const rgb = light ? '255, 255, 255' : '0, 0, 0';

  return {
    bold: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: `rgba(${rgb}, ${light ? 1 : .85})`,
      marginBottom: '.5rem'
    },
    thin: {
      fontSize: '1.5rem',
      marginBottom: '.5rem',
      color: `rgba(${rgb}, ${light ? 1 : .75})`,
    },
    subtle: {
      fontSize: '.75rem',
      textTransform: 'uppercase',
      color: `rgba(${rgb}, ${light ? 1 : .6})`,
      margin: '-.5rem 0 .5rem 0'
    }
  };
};

export const Heading = ({ text, light = false, breakpoints, styles = [] }: Props) => {
  const style = headingStyles(light);

  const styleSheet = StyleSheet.create({
    heading: {
      display: 'block',
      ...forBreakpoints(breakpoints, value => style[value])
    }
  });

  return (
    <span className={css(styleSheet.heading, styles)}>{text}</span>
  );
};
