import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { Label } from './Label';

type Props = WrappedFieldProps & {
  label: string
};

export const Checkbox = ({ input, label }: Props) => {
  const styleSheet = StyleSheet.create({
    checkbox: {}
  });

  return (
    <Label label={label} name={input.name}>
      <input type="checkbox" className={css(styleSheet.checkbox)} {...input} id={input.name}/>
    </Label>
  );
};
