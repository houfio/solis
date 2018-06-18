import { createDakpan } from 'dakpan';

type State = {
  collapsed: boolean
};

export const {
  Provider: AdminProvider,
  Consumer: AdminConsumer,
  actions: adminActions
} = createDakpan<State>({
  collapsed: Boolean(Number(localStorage.getItem('collapsed')))
})({
  toggleCollapsed: () => ({ collapsed }) => {
    localStorage.setItem('collapsed', collapsed ? '0' : '1');

    return {
      collapsed: !collapsed
    };
  }
});
