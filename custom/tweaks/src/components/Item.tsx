import * as React from 'react';
import {connect} from 'react-redux';
import {GlobalState} from '../actions/reducer';
import {ConfigItem} from '../services/config';
import Slider from './Slider';

interface ItemProps {
  item: ConfigItem
}

function typeToWidget(item: ConfigItem) {
  switch(item.type) {
    case "integer-slider":
      return <Slider range={item.range} value={(item.value as any)|0} step={1}/>
    default:
      return <span>{item.value}</span>;
  }
}

const Item = (props: ItemProps) => (
  <div key={props.item.name} className="item">
    <div className="name">{props.item.name}</div>
    <div className="type">{props.item.type}</div>
    <div className="value">{typeToWidget(props.item)}</div>
  </div>
);

export default Item;