import { css, StyleSheet } from 'aphrodite/no-important';
import * as React from 'react';

import { Label } from './Label';

type Props = {
  name: string,
  label: string
};

export const Input = ({ name, label }: Props) => {
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
    <Label label={label} name={name}>
      <input className={css(styleSheet.input)} id={name}/>
    </Label>
  );
};
