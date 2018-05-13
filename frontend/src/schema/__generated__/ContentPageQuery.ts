

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContentPageQuery
// ====================================================

export interface ContentPageQuery_page_blocks_parent {
  __typename: "PageBlock";
  id: string;
}

export interface ContentPageQuery_page_blocks_data_Text {
  __typename: "Text";
  id: string;
  text: string;
  type: number;
}

export interface ContentPageQuery_page_blocks_data_Button_target {
  __typename: "Page";
  path: string;
}

export interface ContentPageQuery_page_blocks_data_Button {
  __typename: "Button";
  id: string;
  text: string;
  type: number;
  target: ContentPageQuery_page_blocks_data_Button_target;
}

export interface ContentPageQuery_page_blocks_data_Image {
  __typename: "Image";
  id: string;
  image: string;
}

export interface ContentPageQuery_page_blocks_data_Column {
  __typename: "Column";
  id: string;
  size: number;
  breakpoint: number;
}

export interface ContentPageQuery_page_blocks_data_Hero {
  __typename: "Hero";
  id: string;
  image: string;
  type: number;
  height: number;
}

export type ContentPageQuery_page_blocks_data = ContentPageQuery_page_blocks_data_Text | ContentPageQuery_page_blocks_data_Button | ContentPageQuery_page_blocks_data_Image | ContentPageQuery_page_blocks_data_Column | ContentPageQuery_page_blocks_data_Hero;

export interface ContentPageQuery_page_blocks {
  __typename: "PageBlock";
  id: string;
  type: string;
  order: number;
  parent: ContentPageQuery_page_blocks_parent | null;
  parentData: number | null;
  data: ContentPageQuery_page_blocks_data;
}

export interface ContentPageQuery_page {
  __typename: "Page";
  blocks: ContentPageQuery_page_blocks[];
}

export interface ContentPageQuery {
  page: ContentPageQuery_page | null;
}

export interface ContentPageQueryVariables {
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