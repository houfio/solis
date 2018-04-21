import { User } from '../api/User';
import { Token } from '../types';
import { createApiRequest } from '../utils/createApiRequest';
import { createModule } from '../utils/createModule';

export const auth = createModule(
  'auth',
  {
    token: localStorage.getItem('token') || undefined
  },
  (createAction) => ({
    getToken: createAction<{
      email: string,
      password: string
    }>('GET_TOKEN')(
      (payload) => ({
        promise: createApiRequest<Token>('post', 'user/login', payload),
        queue: 'page'
      }),
      ({ data: { token } }) => {
        localStorage.setItem('token', token);

        return {
          token
        };
      }
    ),
    getUser: createAction<Token>('GET_USER')(
      ({ token }) => ({
        promise: createApiRequest<User>('get', 'user', undefined, token),
        queue: 'page'
      }),
      ({ data }) => ({
        user: data
      })
    )
  })
);
