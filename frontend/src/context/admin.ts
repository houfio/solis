import { createModule } from '../utils/createModule';

type DefaultState = {
  collapsed: boolean
};

export const {
  Provider: AdminProvider,
  Consumer: AdminConsumer,
  actions: adminActions
} = createModule<DefaultState>({
  collapsed: Boolean(Number(localStorage.getItem('collapsed')))
})({
  toggleCollapsed: () => ({ collapsed }) => {
    localStorage.setItem('collapsed', collapsed ? '0' : '1');

    return {
      collapsed: !collapsed
    };
  }
});
