import { AnyAction, applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import { createBrowserHistory } from 'history';

import { ActionReducer, PartialReducers } from '../types';
import { promise } from '../middleware/promise';
import { getModules } from './getModules';

export const getStore = () => {
  const history = createBrowserHistory();
  const modules = getModules();

  let devMiddleware: Middleware[] = [];
  let reducers: PartialReducers = {};

  if (process.env.NODE_ENV === 'development') {
    devMiddleware = [
      createLogger({
        collapsed: true
      })
    ];
  }

  const store = createStore(
    combineReducers({
      router: routerReducer,
      form: formReducer,
      ...modules.reduce(
        (previous, current) => {
          const keys = Object.keys(current).filter(key => key !== 'name' && key !== 'initialState');

          reducers = {
            ...reducers,
            [current.name]: keys.reduce(
              (result, key) => {
                const value = (current as any)[key] as ActionReducer;

                return {
                  ...result,
                  [value.type]: value.reduce
                };
              },
              {}
            )
          };

          return {
            ...previous,
            [current.name]: (state = current.initialState, anyAction: AnyAction) => {
              const partialReducer = reducers[current.name][anyAction.type];

              if (!partialReducer) {
                return state;
              }

              return {
                ...state as any,
                ...partialReducer(anyAction, state)
              };
            }
          };
        },
        {}
      )
    }),
    applyMiddleware(
      routerMiddleware(history),
      promise(),
      ...devMiddleware
    )
  );

  return {
    store,
    history
  };
};
