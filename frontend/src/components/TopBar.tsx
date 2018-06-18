import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { BLACK, GRAY, WHITE } from '../constants';
import { withContent } from '../context/content';
import { Container } from './Container';

const styleSheet = StyleSheet.create({
  bar: {
    backgroundColor: WHITE,
    color: BLACK
  },
  inner: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  item: {
    padding: '.5rem',
    lineHeight: 1,
    cursor: 'pointer',
    transition: 'background-color .2s ease',
    ':hover': {
      backgroundColor: GRAY
    },
    ':last-child': {
      marginRight: '-.5rem'
    }
  }
});

export const TopBar = withContent((_, { setOpenModal }) => ({ setOpenModal }))(({ setOpenModal }) => (
  <div className={css(styleSheet.bar)}>
    <Container styles={styleSheet.inner}>
      <span className={css(styleSheet.item)} onClick={setOpenModal.e('login')}>Inloggen</span>
      <span className={css(styleSheet.item)} onClick={setOpenModal.e('register')}>Aanvragen</span>
    </Container>
  </div>
));
