import { Notification } from '../types';
import { createModule } from '../utils/createModule';

export const content = createModule(
  'content',
  {
    openMenu: undefined,
    notifications: []
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
    )
  })
);
