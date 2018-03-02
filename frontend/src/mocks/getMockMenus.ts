import { createMockResponse } from '../utils/createMockResponse';
import { Menus } from '../api/Menu';

export const getMockMenus = () => createMockResponse<Menus>({
  header: [
    {
      page_id: 1,
      rows: [
        {
          name: 'Test 1',
          items: [
            2
          ]
        }
      ]
    },
    {
      page_id: 4,
      rows: [
        {
          name: 'Account',
          items: [
            1,
            2,
            3
          ]
        },
        {
          name: 'LUL',
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
          name: 'LUL',
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
      ]
    }
  ]
});
