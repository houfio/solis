import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { DARK_BLUE, WHITE } from '../constants';
import { Container } from './Container';

export const Footer = () => {
  const styleSheet = StyleSheet.create({
    footer: {
      padding: '2rem 0',
      color: WHITE,
      backgroundColor: DARK_BLUE
    }
  });

  return (
    <footer className={css(styleSheet.footer)}>
      <Container>
        Footer
      </Container>
    </footer>
  );
};
