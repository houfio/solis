import 'normalize.css';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'whatwg-fetch';

import { Root } from './containers/Root';
import { createStore } from './utils/createStore';

const { store, history } = createStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
