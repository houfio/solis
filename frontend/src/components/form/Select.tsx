import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { ReactNode } from 'react';
import { WrappedFieldProps } from 'redux-form';

import { Label } from './Label';

type Props = WrappedFieldProps & {
  label: string,
  children: ReactNode
};

export const Select = ({ input, label, children }: Props) => {
  const styleSheet = StyleSheet.create({
    select: {
      border: 'none',
      flexGrow: 1,
      backgroundColor: 'transparent',
      appearance: 'none',
      zIndex: 5
    },
    caret: {
      position: 'absolute',
      right: '2rem',
      top: '.7rem'
    }
  });

  return (
    <Label label={label} name={input.name}>
      <select className={css(styleSheet.select)} {...input} id={input.name}>
        {children}
      </select>
      <FontAwesomeIcon icon="caret-down" className={css(styleSheet.caret)}/>
    </Label>
  );
};
