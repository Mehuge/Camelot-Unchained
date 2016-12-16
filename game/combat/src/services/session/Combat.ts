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
  received?: number;
  sent: number;
  type: number;
}

export interface CombatDamage {
  part: number;
  received: number;
  sent: number;
  type: number;
  woundsInflicted: number;
}

export interface CombatDisruption {
  received: number;
  sent: number;
  source: string;
  tracksInterrupted: boolean;
}

export interface CombatLogEntry {
  id: number;
  when: Date;
  fromFaction: number;
  fromName: string;
  toFaction: number;
  toName: string;
  errors: string[];
  activeEffects: CombatEffect[];
  resources: CombatResource[];
  damages: CombatDamage[];
  disruption: CombatDisruption;
}

export interface CombatTarget {
  entries: CombatLogEntry[];
  faction: number;
}

export interface CombatTargets {
  [key: string]: CombatTarget
};

// state definition
export interface CombatState {
  targets: CombatTargets;
  current: string;
}

// initial state
function initialState () : CombatState {
  console.log('Combat: initialState: entries[]');
  return {
    targets: {},
    current: null
  };
}

// actions
export function addEntry(entry: CombatLogEntry) : any {
  return { type: "entries-add", entry: entry };
}

export function selectTarget(target: string) : any {
  return { type: "select-target", target: target };
}

declare var deepFreeze : any;

// reducer
export default function reducer(state: CombatState = initialState(), action: any) : CombatState {
  console.log('REDUCE ACTION: ' + JSON.stringify(action));
  deepFreeze(state);
  switch(action.type) {
    case "entries-add":
      const targets = state.targets;
      const entry = action.entry;
      const target = targets[entry.toName];
      return Object.assign({}, state, {
        targets: Object.assign({}, targets, {
          [entry.toName]: {
            entries: (target ? target.entries : []).concat(entry),
            faction: entry.toFaction
          }
        }),
        current: state.current ? state.current : entry.toName
      });
    case "select-target":
      return Object.assign({}, state, {
        targets: state.targets,
        current: action.target
      });
  }
  return state;
}