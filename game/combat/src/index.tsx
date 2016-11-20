/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import cu, { client } from 'camelot-unchained';
import startApp from './components/App';

// #TODO Reminder: export a 'has api' check from the camelot-unchained lib
// interface for window cuAPI
interface WindowInterface extends Window {
  cuAPI: any;
  opener: WindowInterface;
}

// declare window implements WindowInterface
declare var window: WindowInterface;

if ((window.opener && window.opener.cuAPI) || window.cuAPI) {
  client.OnInitialized(() => {
    startApp();
  });
} else {
  startApp();
}