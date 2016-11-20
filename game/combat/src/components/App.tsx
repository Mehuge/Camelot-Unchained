/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {createStore} from 'redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import reducer from '../services/session';
import Log from '../components/Log';
import combatService from '../services/combat';

// create our redux store
const store = createStore(reducer);

export default function startApp() {
  // Start the combat log service
  combatService(store);

  // app root element
  const root = document.getElementById('combat');

  // render the app
  ReactDom.render(<Provider store={store}><Log/></Provider>, root);
}