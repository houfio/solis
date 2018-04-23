import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { Label } from './Label';

type Props = WrappedFieldProps & {
  label: string
};

export const Input = ({ input, label }: Props) => {
  const styleSheet = StyleSheet.create({
    input: {
      lineHeight: 1,
      backgroundColor: 'transparent',
      border: 'none',
      color: '#414756',
      flexGrow: 1
    }
  });

  return (
    <Label label={label} name={input.name}>
      <input className={css(styleSheet.input)} {...input} id={input.name}/>
    </Label>
  );
};
