/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import cu, {client} from 'camelot-unchained';

export interface CombatEffect {
  action: string;
  duration: string;
  name: string;
}

export interface CombatResource {
  received: number;
  sent: number;
  type: number;
}

export interface CombatLogEntry {
  id: number;
  when: Date;
  fromFaction: number;
  fromName: string;
  toFaction: number;
  toName: string;
  activeEffects: CombatEffect[],
  resources: CombatResource[]
}

export interface CombatTarget {
  entries: CombatLogEntry[];
}

export interface CombatTargets {
  [key: string]: CombatTarget
};

// state definition
export interface CombatState {
  targets: CombatTargets;
}

// initial state
function initialState () : CombatState {
  console.log('Combat: initialState: entries[]');
  return {
    targets: {}
  };
}

// actions
export function addEntry(entry: CombatLogEntry) : any {
  return { type: "entries-add", entry: entry };
}

declare var deepFreeze : any;

// reducer
export default function reducer(state: CombatState = initialState(), action: any) : CombatState {
  deepFreeze(state);
  switch(action.type) {
    case "entries-add":
      const targets = state.targets;
      const entry = action.entry;
      const target = targets[entry.toName];
      return Object.assign({}, state, {
        targets: Object.assign({}, targets, {
          [entry.toName]: {
            entries: (target ? target.entries : []).concat(entry)
          }
        })
      });
  }
  return state;
}