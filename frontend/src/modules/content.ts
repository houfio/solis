import { ContentBlock } from '../api/ContentBlock';
import { Menu } from '../api/Menu';
import { Page } from '../api/Page';
import { Notification } from '../types';
import { createApiRequest } from '../utils/createApiRequest';
import { createModule } from '../utils/createModule';

export const content = createModule(
  'content',
  {
    pages: undefined,
    contentBlocks: {},
    menus: undefined,
    openMenu: undefined,
    notifications: []
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
      ({ pageId, data }, { contentBlocks }) => ({
        contentBlocks: {
          ...contentBlocks,
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
    setOpenMenu: createAction<{ index?: number }>('SET_OPEN_MENU')(
      (payload) => payload,
      ({ index }, { openMenu }) => ({
        openMenu: openMenu === index ? undefined : index
      })
    ),
    addNotification: createAction<Notification>('ADD_NOTIFICATION')(
      (payload) => payload,
      (payload, { notifications }) => ({
        notifications: [
          ...notifications,
          payload
        ]
      })
    ),
    dismissNotification: createAction<{ notificationId: number }>('DISMISS_NOTIFICATION')(
      (payload) => payload,
      ({ notificationId }, { notifications }) => ({
        notifications: notifications.map((notification) => {
          if (notification.id !== notificationId) {
            return notification;
          }

          return {
            ...notification,
            dismissed: true
          };
        })
      })
    ),
    removeNotification: createAction<{ notificationId: number }>('REMOVE_NOTIFICATION')(
      (payload) => payload,
      ({ notificationId }, { notifications }) => ({
        notifications: notifications.filter((notification) => notification.id !== notificationId)
      })
    )
  })
);
