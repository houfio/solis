import { ReactNode } from 'react';
import { Action as ReduxAction } from 'redux';

import { BREAKPOINTS } from './constants';
import {
  ContentPageQuery_page_blocks,
  ContentPageQuery_page_blocks_data
} from './schema/__generated__/ContentPageQuery';

export type State = {
  content: {
    openMenu?: number,
    notifications: Notification[],
    breadcrumbs: boolean
  },
  admin: {
    collapsed: boolean
  }
};

export type ColorType = 'primary' | 'secondary' | 'tertiary';

export type HeadingType = 'bold' | 'thin' | 'subtle';

export type PageGuardType = 'auth' | 'no_auth';

export type Breakpoint = keyof typeof BREAKPOINTS;

export type RendererProps<T extends ContentPageQuery_page_blocks_data> = {
  data: T,
  drop: (data?: number) => ReactNode | undefined
};

export type ContentBlockRenderer =
  (block: ContentPageQuery_page_blocks, drop?: (data?: number) => ReactNode | undefined) => ReactNode;

export type Map<U, B> = (payload: U) => B;

export type Reduce<M, P> = (payload: M, state: P) => Partial<P>;

export type Action<U, Y> = (payload?: U) => ReduxAction & Y;

export type CreateAction<P> =
  <U>(type: string) => <B>(map: Map<U, B>, reduce: Reduce<B, P>) => Action<U, B>;

export type Actions = {
  [type: string]: Action<any, any>
};

export type Reducers<P, A> = {
  [T in keyof A]: Reduce<any, P>;
};

export type Module<N extends keyof State = keyof State, A extends Actions = Actions> = A & {
  name: N,
  initialState: State[N],
  reducers: Reducers<State[N], A>
};

export type Notification = {
  id: number,
  text: string,
  timeout: number,
  color?: ColorType,
  dismissed?: boolean
};
