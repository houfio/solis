import createMotive from 'react-motive';

import { Actions, Module } from '../types';

export const createModule = <S, I = {}>(defaultState: S) => <A extends Actions<S, I>>(actions: A): Module<S, I, A> => ({
  ...createMotive<S, I>(defaultState),
  actions
});
