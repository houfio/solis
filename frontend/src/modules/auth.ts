import { createModule } from '../utils/createModule';
import { getMockToken } from '../mocks/getMockToken';

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
        promise: getMockToken(),
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
