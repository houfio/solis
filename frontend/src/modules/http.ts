import { createModule } from '../utils/createModule';

export const http = createModule(
  'http',
  {},
  (createAction) => ({
    increaseQueue: createAction<{ queue: string }>('INCREASE_QUEUE')(
      (payload) => payload,
      ({ queue }, state) => {
        const current = state[queue] || 0;

        return {
          ...state,
          [queue]: current + 1
        };
      }
    ),
    decreaseQueue: createAction<{ queue: string }>('DECREASE_QUEUE')(
      (payload) => payload,
      ({ queue }, state) => {
        const current = state[queue] || 0;

        return {
          ...state,
          [queue]: Math.max(0, current - 1)
        };
      }
    )
  })
);
