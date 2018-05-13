

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NavigationQuery
// ====================================================

export interface NavigationQuery_user {
  __typename: "User";
  admin: boolean;
}

export interface NavigationQuery_menu_columns_targets_target {
  __typename: "Page";
  name: string;
  path: string;
}

export interface NavigationQuery_menu_columns_targets {
  __typename: "MenuTarget";
  id: string;
  order: number;
  target: NavigationQuery_menu_columns_targets_target;
}

export interface NavigationQuery_menu_columns {
  __typename: "MenuColumn";
  id: string;
  name: string;
  order: number;
  targets: NavigationQuery_menu_columns_targets[];
}

export interface NavigationQuery_menu {
  __typename: "MenuItem";
  id: string;
  name: string;
  order: number;
  columns: NavigationQuery_menu_columns[];
}

export interface NavigationQuery {
  user: NavigationQuery_user | null;
  menu: NavigationQuery_menu[];
}

//==============================================================
// START Enums and Input Objects
// All enums and input objects are included in every output file
// for now, but this will be changed soon.
// TODO: Link to issue to fix this.
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================