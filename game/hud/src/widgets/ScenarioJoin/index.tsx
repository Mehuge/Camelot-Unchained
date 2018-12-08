/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import styled from 'react-emotion';
import { TabbedDialog, DialogTab } from 'UI/TabbedDialog';
import { GraphQL, GraphQLResult } from '@csegames/camelot-unchained/lib/graphql/react';
import { GraphQLQuery } from '@csegames/camelot-unchained/lib/graphql/query';
// import { ScenarioSummaryDBModel } from 'gql/interfaces';
import { Scenario } from './components/Scenario';
import * as CSS from 'lib/css-helper';

const SCENARIO_JOIN_DIALOG_WIDTH = 706;
const SCENARIO_JOIN_DIALOG_HEIGHT = 275;

const HUDNAV_NAVIGATE = 'navigate';
const ME = 'scenario-join';

interface Size {
  width: number;
  height: number;
}

export const ScenarioJoinDimensions: Size = {
  width: SCENARIO_JOIN_DIALOG_WIDTH,
  height: SCENARIO_JOIN_DIALOG_HEIGHT,
};

const scenarioQuery = (): Partial<GraphQLQuery> => ({
  namedQuery: 'scenarioSummary',
  variables: {
    shardID: game.shardID,
  },
});

const ScenarioJoinWrapper = styled('div')`
  width: 100%;
  height: 100%;
`;

const Scenarios = styled('div')`
  ${CSS.IS_COLUMN}
  ${CSS.DONT_GROW}
  padding: 5px 10px 0 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box!important;
`;

interface ScenarioJoinState {
  visible: boolean;
}

interface ScenarioJoinProps {
}

export class ScenarioJoin extends React.Component<ScenarioJoinProps, ScenarioJoinState> {
  private evh: EventHandle;
  constructor(props: ScenarioJoinProps) {
    super(props);
    this.state = { visible: false };
  }
  public componentDidMount() {
    this.evh = game.on(HUDNAV_NAVIGATE, this.onNavigate);
  }
  public componentWillUnmount() {
    game.off(this.evh);
    this.evh = null;
  }
  public render() {
    return this.state.visible ? (
      <ScenarioJoinWrapper data-input-group='block'>
        <TabbedDialog data-input-group='block'
          name='scenarioJoin' title={'Scenarios'} titleIcon='icon-scenario' onClose={this.onClose}>
          {() => 1
            /* Temp dummy data (no idea what real data will look like at this point) */
            ? (this.renderScenarios({ scenarios: [
              { id: 1, name: 'Point Capture', available: false },
              { id: 2, name: 'Deathmatch', available: true, playersNeeded: {
                tdd: 7,
                vik: 9,
                art: 9,
              }},
            ]}))
            : (
            <GraphQL query={scenarioQuery()}>{
              (results: GraphQLResult<{ scenarios: any }>) => this.renderScenarios(results)
            }</GraphQL>
          )}
        </TabbedDialog>
      </ScenarioJoinWrapper>
    ) : null;
  }

  private onNavigate = (name: string) => {
    if (name === 'gamemenu' && this.state.visible) {
      this.setState({ visible: false });
    }
    if (name === ME) {
      this.setState({ visible: !this.state.visible });
    }
  }

  private renderScenarios = (results: any) => {
    return (
      <DialogTab>
        <Scenarios>
          { results.scenarios.map((scenario: any) => <Scenario info={scenario}></Scenario>) }
        </Scenarios>
      </DialogTab>
    );
  }

  private onClose = () => {
    game.trigger(HUDNAV_NAVIGATE, ME);
  }
}

export default ScenarioJoin;
