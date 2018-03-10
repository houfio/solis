import { createMockResponse } from '../utils/createMockResponse';
import { Menu } from '../api/Menu';

export const getMockMenus = () => createMockResponse<Menu[]>([
  {
    id: 0,
    name: 'primary',
    items: [
      {
        id: 0,
        name: 'Menu item!',
        columns: [
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          },
          {
            name: 'test',
            targets: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          },
          {
            name: 'test',
            targets: [
              3,
              4
            ]
          }
        ],
        visible: true
      },
      {
        id: 1,
        name: 'Short',
        columns: [
          {
            name: 'test',
            targets: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          }
        ],
        visible: true
      },
      {
        id: 2,
        name: 'Long',
        columns: [
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          },
          {
            name: 'test',
            targets: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          },
          {
            name: 'test',
            targets: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          },
          {
            name: 'test',
            targets: [
              3,
              4
            ]
          },
          {
            name: 'Account',
            targets: [
              1,
              2,
              3
            ]
          },
          {
            name: 'hoi',
            targets: [
              1
            ]
          },
          {
            name: 'test',
            targets: [
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
