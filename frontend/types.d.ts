declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;

  export default value;
}

declare module '*.png' {
  const value: string;

  export default value;
}

declare module '*.json' {
  const value: any;

  export default value;
}
