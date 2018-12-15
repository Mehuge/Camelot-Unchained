/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

import * as React from 'react';
import styled from 'react-emotion';
import * as CSS from 'lib/css-helper';

const Container = styled('div')`
`;
const IconMenu = styled('div')`
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

interface Props {
}

interface Scenario {
  icon: string;
  active: string;
  name: string;
}

interface State {
  visible: boolean;
  active: boolean;
  on: boolean;
  scenarios: Scenario[];
  open: boolean;
}

export class ScenarioButton extends React.Component<Props, State> {
  private pulsar: NodeJS.Timer;
  constructor(props: Props) {
    super(props);
    this.state = { visible: true, active: false, on: false, scenarios: [], open: false };
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
          { icon: 'a', active: true, name: 'Capture Point' },
          { icon: 'b', active: true, name: 'Deathmatch' },
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
    const { visible, scenarios, open, on } = this.state;
    if (!visible) return null;
    cls.push(on ? 'lit' : 'unlit');
    return (
      <Container>
        <IconButton className={cls.join(' ')}/>
        { open && (
          <IconMenu>
            { scenarios.map(scenario => <IconButton/>) }
          </IconMenu>
        )}
      </Container>
    );
  }
}
