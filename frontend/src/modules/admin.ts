import { createModule } from '../utils/createModule';

export const admin = createModule(
  'admin',
  {
    collapsed: Boolean(Number(localStorage.getItem('collapsed')))
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
    )
  })
);
