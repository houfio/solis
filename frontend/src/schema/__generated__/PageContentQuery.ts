

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageContentQuery
// ====================================================

export interface PageContentQuery_page_blocks {
  __typename: "PageBlock";
  id: string;
  type: string;
  order: number;
}

export interface PageContentQuery_page {
  __typename: "Page";
  id: string;
  blocks: PageContentQuery_page_blocks[];
}

export interface PageContentQuery {
  page: PageContentQuery_page | null;
}

export interface PageContentQueryVariables {
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