import { ContentBlock, ContentBlockTypes } from '../api/ContentBlock';
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
    setContentBlock: createAction<{
      blockType: keyof ContentBlockTypes,
      data: ContentBlockTypes[keyof ContentBlockTypes],
      page: number,
      order?: number,
      parent?: number,
      parentData?: number
    }>('SET_CONTENT_BLOCK')(
      (payload) => payload,
      (payload, { contentBlocks }) => {
        let blocks = contentBlocks[payload.page];

        if (!blocks) {
          return {};
        }

        const newBlock = {
          id: Math.random(),
          page_id: payload.page,
          type: payload.blockType,
          order: payload.order!,
          children: [],
          data: payload.data,
          hidden: false
        };

        if (!payload.parent && payload.order !== undefined) {
          blocks = [
            ...blocks.map((block) => {
              if (block.order < payload.order!) {
                return block;
              }

              return {
                ...block,
                order: block.order + 1
              };
            }),
            newBlock
          ];
        } else if (payload.parent) {
          blocks = blocks.map((block) => {
            if (block.id !== payload.parent) {
              return block;
            }

            return {
              ...block,
              children: [
                ...block.children,
                newBlock
              ]
            };
          });
        }

        return {
          contentBlocks: {
            ...contentBlocks,
            [payload.page]: blocks
          }
        };
      }
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
