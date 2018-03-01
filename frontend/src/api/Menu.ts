export type MenuType = 'header' | 'footer';

export type Menus = {
  [T in MenuType]: MenuItem[]
}

export type MenuItem = {
  page_id: number,
  rows: {
    name: string,
    items: number[]
  }[]
}
