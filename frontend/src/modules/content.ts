import { createModule } from '../utils/createModule';
import { getMockPages } from '../mocks/getMockPages';
import { getMockContentBlocks } from '../mocks/getMockContentBlocks';
import { createApiRequest } from '../utils/createApiRequest';
import { Menu } from '../api/Menu';

export const content = createModule(
  'content',
  {
    pages: undefined,
    contentBlocks: {},
    menus: undefined,
    openMenu: undefined
  },
  createAction => ({
    getPages: createAction('GET_PAGES')(
      () => ({
        promise: getMockPages(),
        queue: 'all'
      }),
      action => ({
        pages: action.data
      })
    ),
    getContentBlocks: createAction<{ pageId: number }>('GET_CONTENT_BLOCKS')(
      payload => ({
        pageId: payload.pageId,
        promise: getMockContentBlocks(payload.pageId),
        queue: 'page'
      }),
      (action, state) => ({
        contentBlocks: {
          ...state.contentBlocks,
          [action.pageId]: action.data!
        }
      })
    ),
    getMenus: createAction('GET_MENUS')(
      () => ({
        promise: createApiRequest<Menu[]>('get', 'menus'),
        queue: 'all'
      }),
      action => ({
        menus: action.data
      })
    ),
    setOpenMenu: createAction<{ menuIndex?: number }>('SET_OPEN_MENU')(
      payload => payload,
      (action, state) => ({
        openMenu: state.openMenu === action.menuIndex ? undefined : action.menuIndex
      })
    )
  })
);
