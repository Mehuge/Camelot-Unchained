import * as React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
const thunk = require('redux-thunk').default;
import reducer, {GlobalState} from './actions/reducer';
import {init as initConfigService} from './services/config';
import App from './components/App';

const store = createStore(reducer, applyMiddleware(thunk));

initConfigService(store);    // initialise Config service

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mehuge-ui-tweaks')
);