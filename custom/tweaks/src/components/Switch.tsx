import * as React from 'react';
import {Range} from '../services/defaults';

interface SwitchProps {
  on: boolean;
  enabled?: boolean;
  onchange?: (value: boolean) => void;
}

interface SwitchState {
  on: boolean;
}

const Switch = React.createClass<SwitchProps, SwitchState>({
  getInitialState() {
    return { on: false };
  },
  componentDidMount() {
    // set the initial slider position (based on props)
    this.setState({ on: this.props.on });
  },
  componentWillReceiveProps(props: SwitchProps) {
    debugger;
  },
  handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (this.props.enabled === false) return;
    const on = !this.state.on;
    this.setState({ on: on });
    if (this.props.onchange) {
      this.props.onchange(on);
    }
  },
  render() {
    const cls : string[] = ["switch"];
    cls.push(this.state.on ? 'on' : 'off');
    const disabled = this.props.enabled === false;
    if (disabled) cls.push('disabled');
    return (
      <div className={cls.join(' ')} onClick={this.handleClick}>
        <div className="toggle"></div>
      </div>
    );
  }
});

export default Switch;