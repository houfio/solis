import { createMockResponse } from '../utils/createMockResponse';
import { Menu } from '../api/Menu';

export const getMockMenus = () => createMockResponse<Menu[]>([
  {
    id: 1,
    name: 'primary',
    items: [
      {
        id: 1,
        name: 'Menu item!',
        columns: [
          {
            id: 1,
            name: 'Account',
            targets: [
              {
                id: 1,
                target: 1
              }
            ]
          }
        ],
        hidden: false,
        draft: false
      }
    ]
  }
]);
