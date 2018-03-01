import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Container } from './Container';

export const Footer = () => {
  const styleSheet = StyleSheet.create({
    footer: {
      backgroundColor: 'white',
      padding: '1rem 0'
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
