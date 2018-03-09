import { Page } from '../api/Page';
import { createMockResponse } from '../utils/createMockResponse';

export const getMockPages = () => createMockResponse<Page[]>([
  {
    id: 1,
    name: 'Home',
    path: '/',
    guards: [],
    type: 'home',
    visible: true
  },
  {
    id: 2,
    name: 'Login',
    path: '/login',
    guards: [
      {
        type: 'no_auth',
        target: 1
      }
    ],
    visible: true
  },
  {
    id: 3,
    name: 'Register',
    path: '/register',
    guards: [
      {
        type: 'no_auth',
        target: 1
      }
    ],
    visible: true
  },
  {
    id: 4,
    name: 'Profile',
    path: '/profile',
    guards: [
      {
        type: 'auth',
        target: 2
      }
    ],
    visible: true
  },
  {
    id: 5,
    name: 'Empty',
    path: '/test',
    guards: [],
    visible: true
  }
]);
