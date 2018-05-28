import { ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

type Props = RouteComponentProps<any> & {
  children: (ctx: RouteComponentProps<any>) => ReactElement<any> | null;
};

export const RouterContextConsumer = withRouter((props: Props) => {
  return props.children(props);
});
