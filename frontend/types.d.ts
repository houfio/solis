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

declare module 'react-motive' {
  import { ComponentType, ReactNode } from 'react';

  export type ProviderProps<I> = {
    inject?: I
  };

  export type ConsumerProps<S, I> = {
    children: (props: ConsumerChildProps<S, I>) => ReactNode
  };

  export type ConsumerChildProps<S, I> = {
    state: S,
    inject: I,
    dispatch: Dispatch<S, I>
  };

  export type Dispatch<S, I> = (action: Action<S, I>) => void;

  export type Action<S, I> = (state: S, dispatch: Dispatch<S>, inject: I) => Partial<S>;

  export type Motive<S, I> = {
    Provider: ComponentType<ProviderProps<I>>,
    Consumer: ComponentType<ConsumerProps<S, I>>
  };

  export function combineActions<S, I>(...actions: Array<Action<S, I>>): Action<S, I>;

  export default function createMotive<S, I = {}>(defaultState: S): Motive<S, I>;
}
