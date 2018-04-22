import { ReactNode } from 'react';
import { RouterState } from 'react-router-redux';
import { Action as ReduxAction } from 'redux';
import { FormState } from 'redux-form';

import { ContentBlock, ContentBlockTypes } from './api/ContentBlock';
import { Menu } from './api/Menu';
import { Page } from './api/Page';
import { User } from './api/User';
import { BREAKPOINTS } from './constants';

export type State = {
  router: RouterState,
  form: FormState,
  auth: {
    user?: User,
    token?: string
  },
  content: {
    pages?: Page[],
    contentBlocks: {
      [id: number]: ContentBlock[]
    },
    menus?: Menu[],
    openMenu?: number,
    collapsed: boolean
  },
  http: {
    [queue: string]: number
  }
};

export type Token = {
  token: string
};

export type ButtonTypes = 'primary' | 'secondary';

export type HeadingTypes = 'bold' | 'thin' | 'subtle';

export type Breakpoint = keyof typeof BREAKPOINTS;

export type ApiResponseSuccess<T> = {
  success: true,
  data: T
};

export type ApiResponseFailure = {
  success: false,
  code: number,
  message: string
};

export type RendererProps<T extends keyof ContentBlockTypes> = {
  data: ContentBlockTypes[T],
  children: ContentBlockChild[]
};

export type ContentBlockRenderer<T extends keyof ContentBlockTypes> = (block: ContentBlock<T>) => ReactNode;

export type ContentBlockChild = {
  data: number,
  order: number,
  render: () => ReactNode
};

export type Map<U, B> = (payload: U) => B;

export type Reduce<M, P> = (payload: M, state: P) => Partial<P>;

export type Action<U, Y> = (payload?: U) => ReduxAction & Y;

export type AsyncPayload<T> = {
  promise: Promise<T>
};

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type PromisePayload<B> = B extends AsyncPayload<infer T> ? Omit<B, keyof AsyncPayload<T>> & T : B;

export type DispatchedPromise<B> = B extends AsyncPayload<infer T> ? Promise<T> : B;

export type CreateAction<P> =
  <U>(type: string) => <B>(map: Map<U, B>, reduce: Reduce<PromisePayload<B>, P>) => Action<U, DispatchedPromise<B>>;

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
