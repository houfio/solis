import { createModule } from '../utils/createModule';
import { getMockPages } from '../mocks/getMockPages';
import { getMockContentBlocks } from '../mocks/getMockContentBlocks';
import { getMockMenus } from '../mocks/getMockMenus';

export const content = createModule(
  'content',
  {
    pages: undefined,
    contentBlocks: {},
    menus: undefined
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
        promise: getMockMenus(),
        queue: 'all'
      }),
      action => ({
        menus: action.data
      })
    )
  })
);