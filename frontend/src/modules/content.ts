import { Notification } from '../types';
import { createModule } from '../utils/createModule';

export const content = createModule(
  'content',
  {
    openMenu: undefined,
    notifications: [],
    breadcrumbs: Boolean(Number(localStorage.getItem('breadcrumbs')))
  },
  (createAction) => ({
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
    ),
    toggleBreadcrumbs: createAction('TOGGLE_BREADCRUMBS')(
      () => ({}),
      (_, { breadcrumbs }) => {
        localStorage.setItem('breadcrumbs', breadcrumbs ? '0' : '1');

        return {
          breadcrumbs: !breadcrumbs
        };
      }
    )
  })
);
