import { AnyAction, applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import { createBrowserHistory } from 'history';

import { promise } from '../middleware/promise';
import { getModules } from './getModules';
import { Module, State } from '../types';

export const createStore = () => {
  const history = createBrowserHistory();
  const modules = getModules() as Module[];

  const store = createReduxStore<State>(
    combineReducers({
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
    }),
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
  }
};
