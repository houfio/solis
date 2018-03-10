import { createMockResponse } from '../utils/createMockResponse';
import { ContentBlock } from '../api/ContentBlock';

export const getMockContentBlocks = (pageId: number) => createMockResponse<ContentBlock[]>([
  {
    id: 1,
    page_id: 1,
    type: 'text',
    data: {
      text: '# Home\n## Home\n### Home'
    },
    children: [],
    hidden: false
  },
  {
    id: 2,
    page_id: 2,
    type: 'text',
    data: {
      text: 'Login'
    },
    children: [],
    hidden: false
  },
  {
    id: 3,
    page_id: 3,
    type: 'text',
    data: {
      text: 'Register'
    },
    children: [],
    hidden: false
  },
  {
    id: 4,
    page_id: 4,
    type: 'text',
    data: {
      text: 'Profile'
    },
    children: [],
    hidden: false
  },
  {
    id: 5,
    page_id: 1,
    type: 'column',
    data: {
      size: 4,
      breakpoint: 'TABLET_LANDSCAPE'
    },
    children: [
      {
        id: 6,
        type: 'text',
        data: {
          text: 'Hello world!'
        },
        children: [],
        parent_data: 0,
        hidden: false
      },
      {
        id: 10,
        type: 'text',
        data: {
          text: 'wew'
        },
        children: [],
        parent_data: 1,
        hidden: false
      },
      {
        id: 8,
        type: 'button',
        data: {
          text: 'Register',
          type: 'primary',
          target: 3
        },
        children: [],
        parent_data: 3,
        hidden: false
      }
    ],
    hidden: false
  },
  {
    id: 9,
    page_id: 1,
    type: 'button',
    data: {
      text: 'Login',
      type: 'secondary',
      target: 2
    },
    children: [],
    hidden: false,
    draft: false
  }
].filter(item => item.page_id === pageId));
