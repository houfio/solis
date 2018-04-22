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
    openMenu: undefined,
    collapsed: Boolean(Number(localStorage.getItem('collapsed')))
  },
  (createAction) => ({
    getPages: createAction('GET_PAGES')(
      () => ({
        promise: createApiRequest<Page[]>('get', 'pages'),
        queue: 'all'
      }),
      ({ data }) => ({
        pages: data
      })
    ),
    getContentBlocks: createAction<{ pageId: number }>('GET_CONTENT_BLOCKS')(
      ({ pageId }) => ({
        pageId,
        promise: createApiRequest<ContentBlock[]>('get', `pages/${pageId}`),
        queue: 'page'
      }),
      ({ pageId, data }, state) => ({
        contentBlocks: {
          ...state.contentBlocks,
          [pageId]: data
        }
      })
    ),
    getMenus: createAction('GET_MENUS')(
      () => ({
        promise: createApiRequest<Menu[]>('get', 'menus'),
        queue: 'all'
      }),
      ({ data }) => ({
        menus: data
      })
    ),
    setOpenMenu: createAction<{ menuIndex?: number }>('SET_OPEN_MENU')(
      (payload) => payload,
      ({ menuIndex }, { openMenu }) => ({
        openMenu: openMenu === menuIndex ? undefined : menuIndex
      })
    ),
    toggleCollapsed: createAction('TOGGLE_COLLAPSED')(
      (payload) => payload,
      (_, { collapsed }) => {
        localStorage.setItem('collapsed', collapsed ? '0' : '1');

        return {
          collapsed: !collapsed
        };
      }
    )
  })
);
