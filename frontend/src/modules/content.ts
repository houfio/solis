import { ContentBlock } from '../api/ContentBlock';
import { Menu } from '../api/Menu';
import { Page } from '../api/Page';
import { createApiRequest } from '../utils/createApiRequest';
import { createModule } from '../utils/createModule';

export const content = createModule(
  'content',
  {
    pages: undefined,
    contentBlocks: {},
    menus: undefined,
    openMenu: undefined
  },
  (createAction) => ({
    getPages: createAction('GET_PAGES')(
      () => ({
        promise: createApiRequest<Page[]>('get', 'pages'),
        queue: 'all'
      }),
      (action) => ({
        pages: action.data
      })
    ),
    getContentBlocks: createAction<{ pageId: number }>('GET_CONTENT_BLOCKS')(
      (payload) => ({
        pageId: payload.pageId,
        promise: createApiRequest<ContentBlock[]>('get', `pages/${payload.pageId}`),
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
      (action) => ({
        menus: action.data
      })
    ),
    setOpenMenu: createAction<{ menuIndex?: number }>('SET_OPEN_MENU')(
      (payload) => payload,
      (action, state) => ({
        openMenu: state.openMenu === action.menuIndex ? undefined : action.menuIndex
      })
    )
  })
);
