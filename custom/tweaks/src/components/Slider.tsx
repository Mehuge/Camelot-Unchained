import * as React from 'react';
import {Range} from '../services/defaults';

interface SliderProps {
  range: Range
  dp?: number;
  value: number;
  enabled?: boolean;
  onchange?: (value: number) => void;
}

interface SliderState {
  pos: number;
  value: number;
}

const Slider = React.createClass<SliderProps, SliderState>({
  getInitialState() {
    return { pos: 0, value: 0 };
  },
  componentDidMount() {
    // set the initial slider position (based on props)
    const props = this.props;
    const range = this.props.range;
    const value = props.value;
    const min = range ? range.min : 0;
    const max = range ? range.max : 100;
    const pos = (value - min) / ((max - min + 1) / 100);
    this.setState({ pos: pos, value: value });
  },
  componentWillReceiveProps(props: SliderProps) {
    debugger;
  },
  calcValue(pos: number) : number {
    // convert pos (which is a %age along the scale) back to a value
    const props : SliderProps = this.props;
    const range : Range = this.props.range;
    const min = range ? range.min : 0;
    const max = range ? range.max : 100;
    const value = (((max-min+1)/100)*pos)+min;
    if (!props.dp) {
      return value|0;
    }
    return +(Math.round(+(value+'e'+props.dp))+'e-'+props.dp);
  },
  updateValue(value:number) {
    if (value !== this.props.value) {
      console.log('value has changed to ' + value);
      if (this.props.onchange) {
        this.props.onchange(value);
      }
    }
  },
  updatePos(pos: number) {
    const value = this.calcValue(pos);
    this.setState({ pos: pos, value: value });
    this.updateValue(value);
  },
  handleDrag(e: React.MouseEvent) {
    debugger;
  },
  handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (this.props.enabled === false) return;
    const el = e.currentTarget as HTMLElement;
    // give me the % position of the slider (with fractions)
    const pos = ((e.clientX - el.offsetLeft) / el.offsetWidth * 100);
    this.updatePos(pos);
  },
  render() {
    const state = this.state;
    const props = this.props;
    const range = this.props.range;
    const min = range ? range.min : 0;
    const max = range ? range.max : 100;
    const pos = this.state.pos;
    const disabled = this.props.enabled === false;
    const cls: string[] = [ "thumb" ];
    const style: any = { left: pos + '%' };
    if (disabled) cls.push('disabled');
    return (
      <div className="slider" onClick={this.handleClick} onDrag={this.handleDrag}>
        <div className="min">{min}</div>
        <div className="value">{this.state.value}</div>
        <div className="max">{max}</div>
        <div className={cls.join(' ')} style={style}></div>
      </div>
    );
  }
});

export default Slider;