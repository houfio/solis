import { AnyAction, Middleware } from 'redux';

import { http } from '../modules/http';

export const promise = (): Middleware => (api) => (next) => (action) => {
  const anyAction = action as AnyAction;

  if (!(anyAction.promise instanceof Promise)) {
    return next(action);
  }

  const { promise, queue, ...rest } = anyAction;

  if (queue) {
    api.dispatch(http.increaseQueue({ queue }));
  }

  return promise.then((value: any) => {
    next({ ...value, ...rest });

    return value;
  }).catch((error: any) => {
    console.error(error);

    return error;
  }).finally(() => {
    if (queue) {
      api.dispatch(http.decreaseQueue({ queue }));
    }
  });
};
