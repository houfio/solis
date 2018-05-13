import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import 'normalize.css';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'whatwg-fetch';

import { Root } from './containers/Root';
import { content } from './modules/content';
import { createStore } from './utils/createStore';

import introspectionQueryResultData from './fragmentTypes.json';

const { store, history } = createStore();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors }) => {
      store.dispatch(content.addNotification({
        id: Date.now(),
        text: graphQLErrors && graphQLErrors.length ? graphQLErrors[0].message : 'Netwerkfout',
        timeout: 5000
      }));
    }),
    new BatchHttpLink({
      uri: '/api',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData
    })
  })
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root/>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
