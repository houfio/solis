import { AnyAction, Middleware } from 'redux';

import { http } from '../modules/http';

export const promise = (): Middleware => api => next => action => {
  const anyAction = action as AnyAction;

  if (anyAction.promise instanceof Promise) {
    const { promise, queue, ...rest } = anyAction;

    if (queue) {
      api.dispatch(http.increaseQueue({ queue }))
    }

    return promise.then((value: any) => {
      next({ ...value, ...rest });

      if (queue) {
        api.dispatch(http.decreaseQueue({ queue }))
      }

      return value;
    }).catch((value: any) => {
      if (queue) {
        api.dispatch(http.decreaseQueue({ queue }))
      }

      return value;
    }) as any;
  }

  return next(action);
};