import { createDakpan } from 'dakpan';

type State = {
  openMenu?: number,
  breadcrumbs: boolean,
  modal?: 'login' |'register'
};

export const {
  Provider: ContentProvider,
  Consumer: ContentConsumer,
  actions: contentActions,
  withDakpan: withContent
} = createDakpan<State>({
  openMenu: undefined,
  breadcrumbs: Boolean(Number(localStorage.getItem('breadcrumbs'))),
  modal: undefined
})({
  setOpenMenu: (index?: number) => ({ openMenu }) => ({
    openMenu: openMenu === index ? undefined : index
  }),
  toggleBreadcrumbs: () => ({ breadcrumbs }) => {
    localStorage.setItem('breadcrumbs', breadcrumbs ? '0' : '1');

    return {
      breadcrumbs: !breadcrumbs
    };
  },
  setOpenModal: (modal?: 'login' | 'register') => () => ({
    modal
  })
});
