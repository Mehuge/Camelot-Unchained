/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Log component
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { faction, bodyParts } from 'camelot-unchained';
import { connect } from 'react-redux';
import { AppState } from '../services/session';
import { CombatTarget, CombatTargets, CombatLogEntry, CombatDamage, selectTarget } from '../services/session/Combat';

interface BodyParts {
  [key: number]: string;
}
const parts: BodyParts = {
  [bodyParts.HEAD]: "Head",
  [bodyParts.LEFTARM]: "Left Arm",
  [bodyParts.RIGHTARM]: "Right Arm",
  [bodyParts.TORSO]: "Torso",
  [bodyParts.LEFTLEG]: "Left Leg",
  [bodyParts.RIGHTLEG]: "Right Leg"
}

interface Factions {
  [key: number]: string;
}
const factions : Factions = {
  [faction.TDD]: "TDD",
  [faction.ARTHURIAN]: "ARTHURIAN",
  [faction.VIKING]: "VIKING"
};

// Log properties
export interface LogProps {
  targets?: { [key: string] : CombatTarget }
  current: string;
  dispatch?: any
}

// Map redux state to properties
function select(state: AppState) : LogProps {
  console.log('Map CombatState to props: ' + JSON.stringify(state.combat));
  return {
    targets: state.combat.targets,
    current: state.combat.current
  };
}

function displayCombatEntry(entry: CombatLogEntry) {
  const entries : JSX.Element[] = [];
  const when = entry.when.toISOString().substr(11,8);

  if (entry.errors) {
    let key: number = 0;
    entries.push(
      <div key={"errors-"+entry.id} className="combat-errors">
        {entry.errors.map((error) => <span className="error" key={++key}>{error}</span>)}
      </div>
    );
  }

  if (entry.activeEffects) {
    entries.push(
      <div key={"effects-"+entry.id} className="combat-effects">
        <span className="timestamp">{when}</span>
        <span className="effects">{JSON.stringify(entry.activeEffects)}</span>
      </div>
    );
  }

  entry.resources && entries.push(
    <div key={"resources-"+entry.id} className="combat-resources">
      <span className="timestamp">{when}</span>
      <span className="resources">{JSON.stringify(entry.resources)}</span>
    </div>
  );

  let key = 0;
  entry.damages && entries.push(
    <div key={"damages-"+entry.id} className="combat-damages">
      { entry.damages.map((entry: CombatDamage) => (
          <div className="damage" key={++key}>
            <span className="timestamp">{when}</span>
            <span className={"part " + parts[entry.part].toLowerCase()}>{parts[entry.part]}</span>
            <span className="amount">{entry.received.toFixed(1)}</span>
            <span className="mitigated">({(entry.sent - entry.received).toFixed(1)})</span>
            <span className="type">{entry.type}</span>
            <span className="wounds">{entry.woundsInflicted}</span>
          </div>
        ))
      }
    </div>
  );

  entry.disruption && entries.push(
    <div key={"disruption-"+entry.id} className="combat-disruption">
      <span className="timestamp">{when}</span>
      <span className="label">Disrupt</span>
      <span className="amount">{entry.disruption.received}</span>
      <span className="mitigated">({entry.disruption.sent-entry.disruption.received})</span>
      <span className="source">{entry.disruption.source}</span>
      <span className="interrupted">{entry.disruption.tracksInterrupted}</span>
    </div>
  );

  return <div key={entry.id} className="combat-entry">{entries}</div>;
}

// Component
export function Log(props: LogProps) {
  const targets: CombatTargets = props.targets;
  const tabs: JSX.Element[] = [];
  let entries: JSX.Element[];
  if (targets) {
    // add tab-bar
    for (let key in targets) {
      tabs.push(<span className={"tab " + factions[targets[key].faction] + (props.current == key ? " selected" : "") } key={key} onClick={() => {
        props.dispatch(selectTarget(key));
      }}>{key}</span>);
    }
    // if have current tab, show combat entries
    const current: string = props.current;
    if (current) {
      const target: CombatTarget = targets[current];
      if (target) {
        entries = target.entries.map(displayCombatEntry);
      }
    }
  }
  return (
    <div className="tab-frame">
      <div className="tab-bar">{tabs}</div>
      <div className="tab-content">{entries}</div>
    </div>
  );
}

export default connect(select)(Log);