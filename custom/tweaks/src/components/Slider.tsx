import * as React from 'react';
import {Range} from '../services/defaults';

interface SliderProps {
  range: Range
  step: number;
  value: number;
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
    const pos = value / ((max - min) / 100);
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
    return ((pos/(max-min+1)*100)|0) + min;
  },
  updateValue(value:number) {
    if (value !== this.props.value) {
      console.log('value has changed to ' + value);
      if (this.props.onChange) {
        this.props.onChange(value);
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
    const style: any = {};
    const cls: string[] = [ "thumb" ];
    if (this.state.value < 50) {
      style['left'] = pos + '%';
      cls.push('left');
    } else {
      style['right'] = (100-pos) + '%';
      cls.push('right');
    }
    return (
      <div className="slider" onClick={this.handleClick}>
        <div className="min">{min}</div>
        <div className="max">{max}</div>
        <div className={cls.join(' ')} style={style} onDrag={this.handleDrag}>{this.state.value}</div>
      </div>
    );
  }
});

export default Slider;