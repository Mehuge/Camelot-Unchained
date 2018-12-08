/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import styled, { css } from 'react-emotion';
// import * as CSS from 'lib/css-helper';
import { Button } from 'UI/Button';

export const SCENARIO_FONT = `font-family: 'Caudex', serif;`;

const ScenarioContainer = styled('div')`
  display: block;
  position: relative;
  height: 112px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: 0 0;
  border: 1px solid rgba(128,128,128,0.5);
  box-sizing: border-box!important;
`;

const scenarioBgs = {
  1: 'capture-point',
  2: 'deathmatch',
};

const ScenarioTitle = styled('div')`
  ${SCENARIO_FONT}
  position: absolute;
  top: 20px;
  left: 160px;
  width: 300px;
  font-size: 25px;
  color: #f5d797;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const ScenarioStatus = styled('div')`
  font-family: ${SCENARIO_FONT}
  position: absolute;
  top: 55px;
  left: 160px;
  width: 300px;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 14px;
  color: #e8e8e8;
  text-transform: uppercase;
  white-space: pre;
`;

const ScenarioButton = css(`
  position: absolute;
  top: 30px;
  left: 500px;
  width: 152px;
  height: 42px;
  line-height: 42px;
  font-size: 12px;
`);

interface ScenarioProps {
  style?: any;
  info: any;
}

interface ScenarioState {
}

export class Scenario extends React.PureComponent<ScenarioProps, ScenarioState> {
  constructor(props: ScenarioProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const bg = css(`
      background-image:
        linear-gradient(to right, #0000, #000 225px),
        url(images/scenario/join/${scenarioBgs[this.props.info.id]}-bg.png);
    `);
    let status;
    if (this.props.info.available) {
      status = `PLAYERS NEEDED TO START NEXT GAME:\n7 TDD / 9 VKK / 9 ART`;
    } else {
      status = 'Scenario Not Available';
    }
    return (
      <ScenarioContainer css={bg} data-id='scenario-container' style={this.props.style}>
        <ScenarioTitle>{this.props.info.name}</ScenarioTitle>
        <ScenarioStatus>{status}</ScenarioStatus>
        <Button css={ScenarioButton}>Find Match</Button>
      </ScenarioContainer>
    );
  }
}

export default Scenario;
