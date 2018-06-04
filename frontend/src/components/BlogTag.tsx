import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { GRAY } from '../constants';

type Props = {
  icon: IconProp,
  text: string
};

const styleSheet = StyleSheet.create({
  pill: {
    display: 'inline',
    border: `1px solid ${GRAY}`,
    padding: '.1rem .35rem',
    borderRadius: '.5rem',
    marginRight: '.5rem'
  },
  icon: {
    marginRight: '.25rem'
  }
});

export const BlogTag = ({ icon, text }: Props) => (
  <div className={css(styleSheet.pill)}>
    <FontAwesomeIcon icon={icon} className={css(styleSheet.icon)}/>
    {text}
  </div>
);
