import { createModule } from '../utils/createModule';

export const admin = createModule(
  'admin',
  {
    collapsed: Boolean(Number(localStorage.getItem('collapsed'))),
    openPage: undefined
  },
  (createAction) => ({
    toggleCollapsed: createAction('TOGGLE_COLLAPSED')(
      (payload) => payload,
      (_, { collapsed }) => {
        localStorage.setItem('collapsed', collapsed ? '0' : '1');

        return {
          collapsed: !collapsed
        };
      }
    ),
    setOpenPage: createAction<{ pageId: number }>('SET_OPEN_PAGE')(
      (payload) => payload,
      ({ pageId }, { openPage }) => ({
        openPage: openPage === pageId ? undefined : pageId
      })
    )
  })
);
