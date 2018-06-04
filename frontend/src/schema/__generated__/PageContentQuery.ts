

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageContentQuery
// ====================================================

export interface PageContentQuery_page_blocks_data_Text {
  __typename: "Text";
  text: string;
  type: number;
}

export interface PageContentQuery_page_blocks_data_Button_target {
  __typename: "Page";
  path: string;
}

export interface PageContentQuery_page_blocks_data_Button {
  __typename: "Button";
  text: string;
  type: number;
  target: PageContentQuery_page_blocks_data_Button_target;
}

export interface PageContentQuery_page_blocks_data_Image {
  __typename: "Image";
  image: string;
}

export interface PageContentQuery_page_blocks_data_Column {
  __typename: "Column";
  size: number;
  breakpoint: number;
}

export interface PageContentQuery_page_blocks_data_Hero {
  __typename: "Hero";
  image: string;
  type: number;
  height: number;
}

export type PageContentQuery_page_blocks_data = PageContentQuery_page_blocks_data_Text | PageContentQuery_page_blocks_data_Button | PageContentQuery_page_blocks_data_Image | PageContentQuery_page_blocks_data_Column | PageContentQuery_page_blocks_data_Hero;

export interface PageContentQuery_page_blocks {
  __typename: "PageBlock";
  id: string;
  type: string;
  order: number | null;
  data: PageContentQuery_page_blocks_data;
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