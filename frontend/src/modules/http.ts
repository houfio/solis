import { createModule } from '../utils/createModule';
import { Queue } from '../types';

export const http = createModule(
  'http',
  {
    queue: {}
  },
  createAction => ({
    increaseQueue: createAction<Queue>('INCREASE_QUEUE')(
      payload => payload,
      (action, state) => {
        const current = state.queue[action.queue] || 0;

        return {
          queue: {
            ...state.queue,
            [action.queue]: current + 1
          }
        };
      }
    ),
    decreaseQueue: createAction<Queue>('DECREASE_QUEUE')(
      payload => payload,
      (action, state) => {
        const current = state.queue[action.queue] || 0;

        return {
          queue: {
            ...state.queue,
            [action.queue]: Math.max(0, current - 1)
          }
        }
      }
    )
  })
);
