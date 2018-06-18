

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageQuery
// ====================================================

export interface PageQuery_page {
  __typename: "Page";
  id: string;
  name: string;
  path: string;
  type: string | null;
  hidden: boolean;
}

export interface PageQuery {
  page: PageQuery_page | null;
}

export interface PageQueryVariables {
  id: string;
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