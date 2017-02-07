import * as React from 'react';
import {connect} from 'react-redux';
import {GlobalState} from '../actions/reducer';
import {ConfigItem, setConfig} from '../services/config';
import Slider from './Slider';
import Switch from './Switch';

interface ItemProps {
  item: ConfigItem
}

function setItem(item: ConfigItem, value: number) {
  setConfig(item.name, value);
}

function typeToWidget(item: ConfigItem) {
  switch(item.type) {
    case 'integer-slider':
      return (
        <Slider range={item.range} value={(item.value as any)|0}
            enabled={item.editable}
            onchange={(value: number) => { setConfig(item.name, value); }}/>
      );
    case 'float-slider':
      return (
        <Slider range={item.range} value={+item.value} dp={item.dp}
            enabled={item.editable}
            onchange={(value: number) => { setConfig(item.name, value); }}/>
      );
    case 'boolean-switch':
      return (
        <Switch on={item.value == "true"}
            enabled={item.editable}
            onchange={(on: boolean) => { setConfig(item.name, on ? "true" : "false") }}/>
      );
    case 'sub-heading':
      return <span></span>;
    default:
      return <span>{item.value}</span>;
  }
}

const Item = (props: ItemProps) => (
  <div key={props.item.name} className="item">
    <div className="name">{props.item.name}</div>
    <div className="value">{typeToWidget(props.item)}</div>
  </div>
);

export default Item;