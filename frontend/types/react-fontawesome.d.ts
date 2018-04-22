declare module '@fortawesome/react-fontawesome' {
  import { IconDefinition, IconName } from '@fortawesome/fontawesome-common-types';
  import { Component } from 'react';

  type FontAwesomeProps = {
    border?: boolean,
    className?: string,
    mask?: string | string[],
    fixedWidth?: boolean,
    flip?: 'horizontal' | 'vertical' | 'both',
    icon?: IconName | IconName[] | IconDefinition | IconDefinition[],
    listItem?: boolean,
    pull?: 'left' | 'right',
    pulse?: boolean,
    name?: string,
    rotation?: 90 | 180 | 270,
    size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x',
    spin?: boolean,
    symbol?: boolean | string,
    transform?: string | any
  };

  export default class FontAwesomeIcon extends Component<FontAwesomeProps> {}
}
