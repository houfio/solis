import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

type Props = {
  icon: IconProp,
  onClick?: () => void
};

export const Action = ({ icon, onClick }: Props) => {
  const styleSheet = StyleSheet.create({
    action: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2.5rem',
      height: '2.5rem',
      marginLeft: '1rem',
      color: '#414756',
      backgroundColor: '#eee',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all .2s ease',
      ':hover': {
        color: '#fff',
        backgroundColor: '#414756'
      }
    }
  });

  return (
    <div className={css(styleSheet.action)} onClick={onClick}>
      <FontAwesomeIcon icon={icon}/>
    </div>
  );
};
