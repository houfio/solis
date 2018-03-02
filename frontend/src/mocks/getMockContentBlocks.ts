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
      size: 2,
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
        parent_data: 8,
        visible: true
      }
    ],
    visible: true
  }
].filter(item => item.visible && item.page_id === pageId));
