import { createMockResponse } from '../utils/createMockResponse';
import { Menu } from '../api/Menu';

export const getMockMenus = () => createMockResponse<Menu[]>([
  {
    id: 0,
    name: 'primary',
    items: [
      {
        id: 0,
        page_id: 2,
        columns: [
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          },
          {
            name: 'test',
            items: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          },
          {
            name: 'test',
            items: [
              3,
              4
            ]
          }
        ],
        visible: true
      },
      {
        id: 1,
        page_id: 3,
        columns: [
          {
            name: 'test',
            items: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          }
        ],
        visible: true
      },
      {
        id: 2,
        page_id: 4,
        columns: [
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          },
          {
            name: 'test',
            items: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          },
          {
            name: 'test',
            items: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          },
          {
            name: 'test',
            items: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            items: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            items: [
              1
            ]
          },
          {
            name: 'test',
            items: [
              3,
              4
            ]
          }
        ],
        visible: true
      }
    ]
  }
]);
