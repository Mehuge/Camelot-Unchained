/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Log component
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { AppState } from '../services/session';
import { CombatTarget } from '../services/session/Combat'

// Log properties
export interface LogProps {
  targets?: { [key: string] : CombatTarget }
}

// Map redux state to properties
function select(state: AppState) : LogProps {
  console.log('Map CombatState to props: ' + JSON.stringify(state.combat.targets));
  return {
    targets: state.combat.targets
  };
}

// Component
export function Log(props: LogProps) {
  let entries: JSX.Element[] = [];
  if (props.targets) {
    for (let key in props.targets) {
      const target: CombatTarget = props.targets[key];
      entries = target.entries.map((entry) =>
        <div key={entry.id}>
          <span className="from name">{entry.fromName}</span>
          <span className="from faction">{entry.fromFaction}</span>
          <span className="to name">{entry.toName}</span>
          <span className="to faction">{entry.toFaction}</span>
          <span className="effects">{JSON.stringify(entry.activeEffects)}</span>
          <span className="resources">{JSON.stringify(entry.resources)}</span>
        </div>
      );
    }
  }
  return <div>{ entries }</div>;
}

export default connect(select)(Log);