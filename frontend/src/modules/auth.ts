import { createModule } from '../utils/createModule';
import { createApiRequest } from '../utils/createApiRequest';
import { Token } from '../types';

export const auth = createModule(
  'auth',
  {
    token: localStorage.getItem('token') || undefined
  },
  createAction => ({
    getToken: createAction<{
      email: string,
      password: string
    }>('GET_TOKEN')(
      payload => ({
        promise: createApiRequest<Token>('post', 'user/login', payload),
        queue: 'page'
      }),
      action => {
        const token = action.data!.token;
        localStorage.setItem('token', token);

        return {
          token
        };
      }
    )
  })
);
