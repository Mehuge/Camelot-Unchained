import {ConfigItem} from './config';

export function generateOfflineData(items: ConfigItem[]) {
  [
    { name: "Sliders", type: "sub-heading" },
    { name: "Default Slider", type: "integer-slider", editable: true, value: "50" },
    { name: "100 to 200", type: "integer-slider", editable: true, value: "150", range: { min: 100, max: 200 } },
    { name: "0 to 9000", type: "integer-slider", editable: true, value: "4500", range: { min: 0, max: 9000 } },
    { name: "-100 to 100", type: "integer-slider", editable: true, value: "0", range: { min: -100, max: 100 } },
    { name: "disabled range", type: "integer-slider", editable: false, value: "150", range: { min: 0, max: 200 } },
    { name: "float slider", type: "float-slider", dp: 2, editable: true, value: "0", range: { min: -10, max: 10 } },
    { name: "Switches", type: "sub-heading" },
    { name: "On/Off", type: "boolean-switch", editable: true, value: "false" },
    { name: "On/Off disabled", type: "boolean-switch", editable: false, value: "false" },
    { name: "Fillers", type: "sub-heading" },
  ].map((item: ConfigItem) => { items.push(item)});
  for (let i = 0; i < 100; i++) {
      items.push({ name: "Filler", type: "text", editable: true, value: "10" });
  }
}