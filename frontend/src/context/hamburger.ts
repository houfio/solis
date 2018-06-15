import { createDakpan } from 'dakpan';

type State = {
  hovering: boolean,
  collapsed: boolean
};

export const {
  Consumer: HamburgerConsumer,
  Provider: HamburgerProvider
} = createDakpan<State>({
  hovering: false,
  collapsed: true
})({
  setHovering: (hovering: boolean) => () => ({
    hovering
  }),
  toggleCollapsed: () => ({ collapsed }) => ({
    collapsed: !collapsed
  })
});
