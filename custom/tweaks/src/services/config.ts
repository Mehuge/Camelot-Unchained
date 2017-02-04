import {client} from 'camelot-unchained';
import {updateConfigVars} from '../actions/config';
import defaults, {Range, ConfigItemDefaults} from './defaults';

export interface ConfigItem {
  name: string;
  type: string;
  value: string;
  editable: boolean;
  range?: Range;
}

const items: ConfigItem[] = [
];

export function getItems() {
  return items;
}

export function init(store: any) : ConfigItem[] {
  let helpCounter = 0;

  function update() {
    console.log('got vars, call gotConfigVars');
    store.dispatch(updateConfigVars({ items: items }));
  }

  function help() {
    console.log('help()');
    client.SendSlashCommand('help');
    setTimeout(update, 1000);
  }

  function OnConsoleText(text: any) {
    const lines = text.split('\n');
    console.dir(lines);
    for (let i = 0; i < lines.length; i++) {
      const nv = lines[i].split(' = ');
      let j;
      for (j = 0; j < items.length; j++) {
        if (items[j].name === nv[0]) {
          break;
        }
      }
      if (j < items.length) {
        items[j].value = nv[1];
        console.log('SET ' + nv[0] + '=' + nv[1]);
      } else {
        if (nv.length === 2) {
          console.log('ADD ' + nv[0] + '=' + nv[1]);
          const d: ConfigItemDefaults = defaults[nv[0]];
          items.push({
            name: nv[0],
            type: d ? d.type : undefined,
            editable: d ? d.editable : false,
            range: d ? d.range : undefined,
            value: nv[1]
          });
        }
      }
    }
  }

  function offlineData() {
    for (let i = 0; i < 1000; i++) {
        items.push({ name: "TestVar", type: "integer-slider", editable: true, value: "10" });
    }
    store.dispatch(updateConfigVars({ items: items }));
  }

  let count = items.length;
  console.log('init configs');
  if (typeof client.OnConsoleText !== "undefined") {
    client.OnConsoleText(OnConsoleText);
    help();
  } else {
    setTimeout(offlineData, 1000);
  }

  return items;
}