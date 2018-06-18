import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { BLUE, TURQUOISE_ACCENT, WHITE } from '../constants';
import { Container } from './Container';

const styleSheet = StyleSheet.create({
  footer: {
    padding: '2rem 0',
    color: WHITE,
    background: `linear-gradient(90deg, ${BLUE} 0%, ${TURQUOISE_ACCENT} 100%)`,
    borderRadius: '.5rem .5rem 0 0'
  }
});

export const Footer = () => (
  <footer className={css(styleSheet.footer)}>
    <Container>
      Footer
    </Container>
  </footer>
);
