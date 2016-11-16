/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import cu, {client} from 'camelot-unchained';

// app root element
const root = document.getElementById('combat');

// state definition
interface CombatState {
  entries: string[];
}

// initial state
const initialState = () : CombatState => {
  return {
    entries: []
  };
}

// reducer
const reducer = (state: CombatState = initialState(), action: any) => {
  console.log('reduce');
  switch(action.type) {
    case "entries-add":
      state = Object.assign({}, state, { entries: state.entries.concat(action.entry) });
      console.log(state);
      break;
  }
  return state;
}

// store
const store = createStore(reducer);

// actions
const addEntry = (entry: String) => {
  return { type: "entries-add", entry: entry };
}

// service
const service = () => {
  console.log('start service');
  setInterval(() => {
    console.log('add entry');
    store.dispatch(addEntry("new Entry"));
  }, 1000);
}

// components
// Log component

interface LogProps {
  entries?: String[];
}
function mapStateToLogProps(state: CombatState) : LogProps {
  return {
    entries: state.entries
  };
}
function Log(props: LogProps) {
  console.log('render');
  const entries = props.entries;
  return <div>{
      entries.map((entry) => <div>{entry}</div>)
    }</div>;
}
const LogView = connect(mapStateToLogProps)(Log); // join state to component props

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
    ReactDom.render(
      <Provider store={store}>
        <LogView/>
      </Provider>,
      root);
  });
} else {
  ReactDom.render(
    <Provider store={store}>
        <LogView/>
    </Provider>,
    root);
}

connect()

service();