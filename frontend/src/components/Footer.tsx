import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { Container } from './Container';

export const Footer = () => {
  const styleSheet = StyleSheet.create({
    footer: {
      padding: '2rem 0',
      color: 'white',
      backgroundColor: '#414756'
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
