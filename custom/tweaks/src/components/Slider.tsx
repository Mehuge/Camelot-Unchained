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
  moving: boolean;
}

const Slider = React.createClass<SliderProps, SliderState>({
  getInitialState() {
    return { pos: 0, value: 0, moving: false };
  },
  componentDidMount() {
    this.updatePosFromValue(this.props.value);
  },
  updatePosFromValue(value: number) {
    // set the initial slider position (based on props)
    const props = this.props;
    const range = this.props.range;
    const min = range ? range.min : 0;
    const max = range ? range.max : 100;
    const pos = (value - min) / ((max - min) / 100);
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
    const value = (((max-min)/100)*pos)+min;
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
  handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (this.props.enabled === false) return;
    const granularity =
      e.altKey ? 0.001 : e.ctrlKey ? 0.01 : e.shiftKey ? 0.1 : 1;
    let pos;
    if (e.deltaY < 0) {
        pos = this.state.pos - granularity;
        if (pos >= 0) this.updatePos(pos);
    } else if (e.deltaY > 0) {
        pos = this.state.pos + granularity;
        if (pos <= 100) this.updatePos(pos);
    }
  },
  startDrag(e: React.MouseEvent) {
    e.preventDefault();
    if (this.props.enabled === false) return;
    this.setState({ moving: true });
    this.followMouse(e);
    this.move(e);
  },
  endDrag(e: React.MouseEvent) {
    e.preventDefault();
    if (this.props.enabled === false) return;
    this.setState({ moving: false });
    this.followMouse(e);
    this.move(e);
  },
  followMouse(e: React.MouseEvent) {
    e.preventDefault();
    if (this.props.enabled === false) return;
    if (!this.state.moving) return;
    this.move(e);
  },
  move(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    // give me the % position of the slider (with fractions)
    const pos = ((e.clientX - el.offsetLeft) / el.offsetWidth * 100);
    if (pos < 0) {
      this.updatePosFromValue(this.props.range ? this.props.range.min : 0);
    } else if (pos > 100) {
      this.updatePosFromValue(this.props.range ? this.props.range.max : 0);
    } else {
      this.updatePos(pos);
    }
  },
  handleEnter(e: React.MouseEvent) {
    if (e.buttons == 1 && e.button == 0) {
      // left button was down, start moving
      this.startDrag(e);
    }
  },
  handleLeave(e: React.MouseEvent) {
    this.setState({ moving: false });
  },
  render() {
    const state = this.state;
    const props = this.props;
    const range = this.props.range;
    const min = range ? range.min : 0;
    const max = range ? range.max : 100;
    const pos = this.state.pos;
    const disabled = this.props.enabled === false;
    const slider: string[] = [ "slider" ];
    const style: any = { left: pos + '%' };
    if (disabled) slider.push('disabled');
    if (state.moving) slider.push('moving');
    return (
      <div className={slider.join(' ')}
          onMouseDown={this.startDrag}
          onMouseMove={this.followMouse}
          onMouseUp={this.endDrag}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
          onWheel={this.handleWheel}>
        <div className="min">{min}</div>
        <div className="value">{this.state.value}</div>
        <div className="max">{max}</div>
        <div className="thumb" style={style}></div>
      </div>
    );
  }
});

export default Slider;