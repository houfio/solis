import { createBrowserHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { AnyAction, applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { createLogger } from 'redux-logger';

import { admin } from '../modules/admin';
import { content } from '../modules/content';
import { Module, State } from '../types';

export const createStore = () => {
  const history = createBrowserHistory();
  const modules = [
    content,
    admin
  ] as Module[];

  const store = createReduxStore(
    combineReducers<State>({
      router: routerReducer,
      ...modules.reduce(
        (previous, current) => ({
          ...previous,
          [current.name]: (state = current.initialState, action: AnyAction) => {
            const reduce = current.reducers[action.type];

            if (!reduce) {
              return state;
            }

            return {
              ...state as any,
              ...reduce(action, state) as any
            };
          }
        }),
        {}
      )
    } as any),
    applyMiddleware(
      routerMiddleware(history),
      ...process.env.NODE_ENV === 'production' ? [] : [
        createLogger({
          collapsed: true
        })
      ]
    )
  );

  return {
    store,
    history
  };
};
