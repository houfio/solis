import { createModule } from '../utils/createModule';

type DefaultState = {
  openMenu?: number,
  breadcrumbs: boolean
};

export const {
  Provider: ContentProvider,
  Consumer: ContentConsumer,
  actions: contentActions
} = createModule<DefaultState>({
  openMenu: undefined,
  breadcrumbs: Boolean(Number(localStorage.getItem('breadcrumbs')))
})({
  setOpenMenu: (index?: number) => ({ openMenu }) => ({
    openMenu: openMenu === index ? undefined : index
  }),
  toggleBreadcrumbs: () => ({ breadcrumbs }) => {
    localStorage.setItem('breadcrumbs', breadcrumbs ? '0' : '1');

    return {
      breadcrumbs: !breadcrumbs
    };
  }
});
