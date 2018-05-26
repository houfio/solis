import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { PURPLE, WHITE } from '../constants';

type Props = {
  icon: IconProp,
  onClick?: () => void,
  color?: string
};

export const Action = ({ icon, onClick, color = PURPLE }: Props) => {
  const styleSheet = StyleSheet.create({
    action: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2.5rem',
      height: '2.5rem',
      marginLeft: '1rem',
      color,
      border: '1px solid #eee',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all .2s ease',
      ':hover': {
        color: WHITE,
        backgroundColor: color,
        border: 'none'
      }
    }
  });

  return (
    <div className={css(styleSheet.action)} onClick={onClick}>
      <FontAwesomeIcon icon={icon}/>
    </div>
  );
};
