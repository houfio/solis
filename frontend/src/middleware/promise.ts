import { AnyAction, Middleware } from 'redux';

import { content } from '../modules/content';
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
    if (error.message) {
      api.dispatch(content.addNotification({
        id: Date.now(),
        text: error.message,
        timeout: 5000
      }));
    }

    console.log(error);

    return error;
  }).finally(() => {
    if (queue) {
      api.dispatch(http.decreaseQueue({ queue }));
    }
  });
};
