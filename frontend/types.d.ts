declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;

  export default value;
}

declare module '*.png' {
  const value: string;

  export default value;
}

declare module '*.json' {
  const value: any;

  export default value;
}

declare module 'react-tippy' {
  import { Component, ComponentType, CSSProperties, ReactNode } from 'react';

  type TippyProps = {
    disabled?: boolean,
    open?: boolean,
    useContext?: boolean,
    onRequestClose?: () => void,
    position?: 'top' | 'bottom' | 'left' | 'right',
    trigger?: 'mouseenter' | 'focus' | 'click' | 'manual',
    interactive?: boolean,
    interactiveBorder?: number,
    delay?: number,
    hideDelay?: number,
    animation?: 'shift' | 'perspective' | 'fade' | 'scale' | 'none',
    arrow?: boolean,
    arrowSize?: 'regular' | 'small' | 'big',
    duration?: number,
    hideDuration?: number,
    distance?: number,
    hideOnClick?: boolean | 'persistent',
    multiple?: boolean,
    followCursor?: false,
    inertia?: boolean,
    transitionFlip?: boolean,
    popperOptions?: object,
    html?: ReactNode,
    unmountHTMLWhenHide?: boolean,
    size?: 'regular' | 'small' | 'big',
    sticky?: boolean,
    stickyDuration?: number,
    beforeShown?: () => void,
    shown?: () => void,
    beforeHidden?: () => void,
    hidden?: () => void,
    theme?: 'dark' | 'light' | 'transparent',
    className?: string,
    style?: CSSProperties
  };

  export class Tooltip extends Component<TippyProps> {}

  export function withTooltip<T extends ComponentType<any>>(component: T, options: TippyProps): T;
}
