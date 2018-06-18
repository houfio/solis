import { createContext, ReactElement } from 'react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

type Props = RouteComponentProps<any> & {
  children: (ctx: RouteComponentProps<any>) => ReactElement<any> | null;
};

const Context = createContext<RouteComponentProps<any>>({} as RouteComponentProps<any>);

export const RouterConsumer = withRouter((props: Props) => {
  return props.children(props);
});

export const RouterProvider = (props: { children: React.ReactNode }) => {
  const ConnectedContextProvider = withRouter((props: RouteComponentProps<any> & { children: React.ReactNode }) => {
    return (
      <Context.Provider value={props}>
        {props.children}
      </Context.Provider>
    );
  });

  return (
    <BrowserRouter>
      <ConnectedContextProvider>
        {props.children}
      </ConnectedContextProvider>
    </BrowserRouter>
  );
};
