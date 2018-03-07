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
    visible: true
  },
  {
    id: 2,
    page_id: 2,
    type: 'text',
    data: {
      text: 'Login'
    },
    children: [],
    visible: true
  },
  {
    id: 3,
    page_id: 3,
    type: 'text',
    data: {
      text: 'Register'
    },
    children: [],
    visible: true
  },
  {
    id: 4,
    page_id: 4,
    type: 'text',
    data: {
      text: 'Profile'
    },
    children: [],
    visible: true
  },
  {
    id: 5,
    page_id: 1,
    type: 'column',
    data: {
      size: 3,
      breakpoint: 'md'
    },
    children: [
      {
        id: 6,
        type: 'text',
        data: {
          text: 'Hello'
        },
        children: [],
        parent_data: 4,
        visible: true
      },
      {
        id: 7,
        type: 'text',
        data: {
          text: 'World'
        },
        children: [],
        parent_data: 4,
        visible: true
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
        parent_data: 4,
        visible: true
      }
    ],
    visible: true
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
    visible: true
  }
].filter(item => item.page_id === pageId));
