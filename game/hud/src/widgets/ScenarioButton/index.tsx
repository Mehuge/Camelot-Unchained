/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import styled  from 'react-emotion';
import * as CSS from 'lib/css-helper';

export const SCENARIO_FONT = `font-family: 'Caudex', serif;`;

const Container = styled('div')`
`;

const IconMenu = styled('div')`
  margin-top: 5px;
`;

const IconButton = styled('div')`
  ${CSS.ALLOW_MOUSE}
  box-sizing: border-box!important;
  width: 36px;
  height: 36px;
  line-height: 36px;
  color: #cbcbcb;
  background-color: rgba(0,0,0,0.8);
  font-size: 22px;
  text-align: center;
  background-image: url(images/settings/button-off.png);
  background-size: cover;
  &:hover {
    color: #f5d598;
    background-image: url(images/settings/button-on.png);
  }
  &.lit {
    box-shadow: 0 0 10px 5px rgba(245, 213, 152, 1);
    transition: 1s linear 0s;
    border-radius: 5px;
    color: #f5d598;
    background-image: url(images/settings/button-on.png);
  }
  &.unlit {
    transition: 1s linear 0s;
    box-shadow: 0 0 10px 5px rgba(245, 213, 152, 0);
    box-shadow: none;
    border-radius: 0px;
    color: #cbcbcb;
    background-image: url(images/settings/button-off.png);
  }
`;

const Icon = styled('div')`
  position: relative;
  top: 2px;
  left: 2px;
  width: 32px;
  height: 32px;
  background-size: cover;
`;

const ToolTip = styled('div')`
  background-color: rgba(0,0,0,0.8);
  border: 1px solid rgba(128,128,128,0.5);
  position: absolute;
  top: 0;
  right: 40px;
  width: 200px;
  height: 70px;
  z-index: 32000;
`;

const ToolTipContent = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
`;

const ToolTipTitle = styled('div')`
  ${SCENARIO_FONT}
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 15px;
  color: #f5d797;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const ToolTipSubTitle = styled('div')`
  position: absolute;
  top: 35px;
  left: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 14px;
  color: #e8e8e8;
  text-transform: uppercase;
  white-space: pre;
  text-shadow: 0 0 5px 5px black;
`;

interface Props {
}

interface Scenario {
  id: string;
  active: string;
  name: string;
}

interface State {
  visible: boolean;
  active: boolean;
  on: boolean;
  scenarios: Scenario[];
  open: boolean;
  hover: number;
}

export class ScenarioButton extends React.Component<Props, State> {
  private pulsar: NodeJS.Timer;
  private nodes: any[] = [];
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: true,
      active: false,
      on: false,
      scenarios: [],
      open: false,
      hover: null,
    };
  }
  public componentDidMount() {
    // register for scenario notifications
    this.setState((state: State) => {
      if (true /* new state is active */ && !this.pulsar) {
        this.pulsar = setInterval(() => this.setState((state: any) => ({ on: !state.on })), 1000);
      }
      return Object.assign({}, state, {
        active: true,
        scenarios: [
          { id: 'capture-point', active: true, name: 'Point Capture' },
          { id: 'deathmatch', active: true, name: 'Deathmatch' },
        ],
      });
    });
  }
  public componentWillUnmount() {
    // unregister for scenario notifications
    if (this.pulsar) {
      clearInterval(this.pulsar);
      this.pulsar = null;
    }
  }
  public render() {
    const cls = ['icon-scenario'];
    const { visible, scenarios, open, on, hover } = this.state;
    if (!visible) return null;
    cls.push(on ? 'lit' : 'unlit');
    return (
      <Container>
        { hover != null && (
          <ToolTip style={{ top: `${this.nodes[hover].offsetTop - 20}px` }}>
            <ToolTipContent
              style={{ backgroundImage: `
                  linear-gradient(to right, #0000, #000 100px),
                  url(images/scenario/join/${scenarios[hover].id}-bg.png)
                ` }}>
              <ToolTipTitle>{scenarios[hover].name}</ToolTipTitle>
              <ToolTipSubTitle>Click To Join</ToolTipSubTitle>
            </ToolTipContent>
          </ToolTip>
        )}
        <IconButton className={cls.join(' ')} onClick={this.click}/>
        { open && (
          <IconMenu>
            { scenarios.map((scenario, index) => (
                <IconButton onMouseOver={this.hover} onMouseOut={this.hover}>
                  <Icon
                    ref={(node: any) => this.nodes[index] = ReactDOM.findDOMNode(node)}
                    style={{ backgroundImage: `url(images/scenario/join/${scenario.id}-bg.png)` }}
                    />
                </IconButton>
              ))
            }
          </IconMenu>
        )}
      </Container>
    );
  }

  private click = () => {
    this.setState({ open: !this.state.open });
  }

  private hover = (e: React.MouseEvent) => {
    const nodes = this.nodes;
    let index: number;
    let scenario: Scenario;
    for (let i = 0; i < this.nodes.length; i++) {
      if (nodes[i] === e.target) {
        console.log(`${e.type} ${i}`);
        scenario = this.state.scenarios[index = i];
        break;
      }
    }
    switch (e.type) {
      case 'mouseover':
        console.log(`hover over ${scenario.id}`);
        this.setState({ hover: index });
        break;
      case 'mouseout':
        if (this.state.hover === index) {
          console.log(`no loger overing over ${scenario.id}`);
          this.setState({ hover: null });
        }
        break;
    }
  }
}
