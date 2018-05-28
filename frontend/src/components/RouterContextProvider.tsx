import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { RouterContext } from '../context/RouterContext';

export const RouterContextProvider = (props: { children: React.ReactNode }) => {
  const ConnectedContextProvider = withRouter((props: RouteComponentProps<any> & { children: React.ReactNode }) => {
    return (
      <RouterContext.Provider value={props}>
        {props.children}
      </RouterContext.Provider>
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
