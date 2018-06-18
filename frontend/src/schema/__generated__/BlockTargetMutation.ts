

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BlockTargetMutation
// ====================================================

export interface BlockTargetMutation_createBlock_data_Text {
  __typename: "Text";
  text: string;
  type: number;
}

export interface BlockTargetMutation_createBlock_data_Button_target {
  __typename: "Page";
  path: string;
}

export interface BlockTargetMutation_createBlock_data_Button {
  __typename: "Button";
  text: string;
  type: number;
  target: BlockTargetMutation_createBlock_data_Button_target;
}

export interface BlockTargetMutation_createBlock_data_Image {
  __typename: "Image";
  image: string;
}

export interface BlockTargetMutation_createBlock_data_Column {
  __typename: "Column";
  size: number;
  breakpoint: number;
}

export interface BlockTargetMutation_createBlock_data_Hero {
  __typename: "Hero";
  image: string;
  type: number;
  height: number;
}

export type BlockTargetMutation_createBlock_data = BlockTargetMutation_createBlock_data_Text | BlockTargetMutation_createBlock_data_Button | BlockTargetMutation_createBlock_data_Image | BlockTargetMutation_createBlock_data_Column | BlockTargetMutation_createBlock_data_Hero;

export interface BlockTargetMutation_createBlock {
  __typename: "PageBlock";
  id: string;
  type: string;
  order: number | null;
  data: BlockTargetMutation_createBlock_data;
}

export interface BlockTargetMutation {
  createBlock: BlockTargetMutation_createBlock | null;
}

export interface BlockTargetMutationVariables {
  id: string;
  type: string;
  parent?: string | null;
  parentData?: number | null;
  order?: number | null;
  data: string;
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