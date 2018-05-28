import { createContext } from 'react';
import { RouteComponentProps } from 'react-router';

export const RouterContext = createContext<RouteComponentProps<any>>({} as RouteComponentProps<any>);
