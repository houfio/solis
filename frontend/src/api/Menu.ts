export type MenuType = 'header';

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
