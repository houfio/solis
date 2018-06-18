

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostQuery
// ====================================================

export interface BlogPostQuery_post_tags {
  __typename: "BlogTag";
  tag: string;
}

export interface BlogPostQuery_post {
  __typename: "BlogPost";
  tags: BlogPostQuery_post_tags[];
  title: string;
  content: string;
  creationDate: Date;
}

export interface BlogPostQuery {
  post: BlogPostQuery_post | null;
}

export interface BlogPostQueryVariables {
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