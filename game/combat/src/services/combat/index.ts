/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import cu, { client } from 'camelot-unchained';
import { addEntry, CombatLogEntry } from '../session/Combat';

// The combat services job is to listen for combat log events and to fire
// actions
// CombatLogEvent: [
//   { "activeEffects": [
//       {"action":1, "duration":"", "name":"basicbow"},
//       {"action":0, "duration":"for 6 seconds", "name":"furiousredraw"}
//     ],
//     "fromFaction":2,
//     "fromName":"Meviking",
//     "resources":[
//       { "recieved":-1, "sent":-1, "type":17 }
//     ],
//     "toFaction":2,
//     "toName":"Meviking"
//   }
// ]

let entryId: number = 0;

// parse combat log event into a CombatLogEntry object
function parse(entry: any): CombatLogEntry {
  console.log('DISRUPTION: ' + JSON.stringify(entry.disruption));
  const o : CombatLogEntry = {
    id: entryId++,
    when: new Date(),
    fromName: entry.fromName,
    toName: entry.toName,
    fromFaction: entry.fromFaction,
    toFaction: entry.toFaction,
    errors: entry.errors,
    activeEffects: entry.activeEffects && entry.activeEffects.map((entry: any) => ({
      action: entry.action,
      duration: entry.duration,
      name: entry.name
    })),
    resources: entry.resources && entry.resources.map((entry: any) => ({
      received: entry.recieved,     // note spelling mistake in CU data
      sent: entry.sent,
      type: entry.type
    })),
    damages: entry.damages && entry.damages.map((entry: any) => ({
      part: entry.part,
      received: entry.recieved,     // note spelling mistake in CU data
      sent: entry.sent,
      type: entry.type,
      woundsInflicted: entry.woundsInflicted
    })),
    disruption: entry.disruption && {
      received: entry.disruption.recieved,     // note spelling mistake in CU data
      sent: entry.disruption.sent,
      source: entry.disruption.source,
      tracksInterrupted: entry.disruption.tracksInterupted     // note spelling mistake in CU data
    }
  };
  console.log('PARSED: ' + JSON.stringify(o));
  return o;
}

// service
export default function service (store: any) : void {
  // watch combat events
  console.log('listen for OnCombatLogEvents');
  client.OnCombatLogEvent((e: any) => {
    console.log('OnCombatLogEvent: ' + JSON.stringify(e));
    for (let i = 0; i < e.length; i++) {
      store.dispatch(addEntry(parse(e[i])));
    }
  });
}