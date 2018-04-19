import { createBrowserHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { AnyAction, applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

import { promise } from '../middleware/promise';
import { Module, State } from '../types';
import { getModules } from './getModules';

export const createStore = () => {
  const history = createBrowserHistory();
  const modules = getModules() as Module[];

  const store = createReduxStore(
    combineReducers<State>({
      router: routerReducer,
      form: formReducer,
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
      promise(),
      ...process.env.NODE_ENV !== 'development' ? [] : [
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
