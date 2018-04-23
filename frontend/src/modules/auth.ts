import { User } from '../api/User';
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
        promise: createApiRequest<{ token: string }>('post', 'user/login', payload),
        queue: 'page'
      }),
      ({ data: { token } }) => {
        localStorage.setItem('token', token);

        return {
          token
        };
      }
    ),
    getUser: createAction<{ token: string }>('GET_USER')(
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
