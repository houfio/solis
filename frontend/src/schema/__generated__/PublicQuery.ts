

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PublicQuery
// ====================================================

export interface PublicQuery_pages_guards_target {
  __typename: "Page";
  path: string;
}

export interface PublicQuery_pages_guards {
  __typename: "PageGuard";
  id: string;
  type: string;
  target: PublicQuery_pages_guards_target;
}

export interface PublicQuery_pages {
  __typename: "Page";
  id: string;
  name: string;
  path: string;
  type: string | null;
  guards: PublicQuery_pages_guards[];
}

export interface PublicQuery {
  pages: PublicQuery_pages[];
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