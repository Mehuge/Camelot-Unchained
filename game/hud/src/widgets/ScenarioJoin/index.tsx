/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import styled from 'react-emotion';
import { TabbedDialog, DialogTab } from 'UI/TabbedDialog';
import { GraphQL, GraphQLResult, GraphQLQueryOptions } from '@csegames/camelot-unchained/lib/graphql/react';
import { Scenario, ScenarioMatch } from './components/Scenario';
import * as CSS from 'lib/css-helper';

const SCENARIO_JOIN_DIALOG_WIDTH = 850;
const SCENARIO_JOIN_DIALOG_HEIGHT = 410;

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

const scenarioQuery = (): Partial<GraphQLQueryOptions> => ({
  pollInterval: 10000,
  query: `{
    myScenarioQueue {
      availableMatches {
        id
        name
        icon
        isQueued
        gamesInProgress
        charactersNeededToStartNextGameByFaction {
          tdd
          viking
          arthurian
        }
        totalBackfillsNeededByFaction {
          tdd
          viking
          arthurian
        }
      }
    }
  }`,
});

const ScenarioJoinWrapper = styled('div')`
  width: 100%;
  height: 100%;
`;

const LoadingScenarios = styled('div')`
  ${CSS.IS_COLUMN}
  ${CSS.DONT_GROW}
  width: 100%;
  min-height: 140px;
  font-size: 30px;
  text-align: center;
  padding-top: 70px;
`;

const ScenariosContainer = styled('div')`
  ${CSS.IS_COLUMN}
  ${CSS.DONT_GROW}
  width: 100%;
  height: auto;
  max-height: 370px;
  padding-bottom: 10px;
  padding-top: 5px;
  box-sizing: border-box !important;
`;

const Scenarios = styled('div')`
  ${CSS.IS_COLUMN}
  ${CSS.DONT_GROW}
  padding: 0 10px 0 10px;
  box-sizing: border-box!important;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  pointer-events: all;
`;

interface ScenarioJoinState {
  visible: boolean;
}

interface ScenarioJoinProps {
}

export class ScenarioJoin extends React.Component<ScenarioJoinProps, ScenarioJoinState> {
  private evh: EventHandle;
  private scenarios: ScenarioMatch[];
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
    const { visible } = this.state;
    return visible ? (
      <ScenarioJoinWrapper data-input-group='block'>
        <TabbedDialog data-input-group='block'
            name='scenarioJoin' title={'Scenarios'} titleIcon='icon-scenario' autoHeight={true}
            onClose={this.onClose}>
          {() => (
            <DialogTab>
              <GraphQL query={scenarioQuery()}>
                {(results: GraphQLResult<any>): JSX.Element => {
                  if (!results.loading && (!results.lastError || results.lastError === 'OK') && results.data) {
                    const myScenarioQueue = results.data.myScenarioQueue;
                    if (myScenarioQueue && myScenarioQueue.availableMatches) {
                      this.scenarios = results.data.myScenarioQueue.availableMatches;
                    }
                  }
                  return this.scenarios ? this.renderScenarios() : this.loading();
                }}
              </GraphQL>
            </DialogTab>
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

  private renderScenarios = () => {
    const scenarios = this.scenarios;
    return (
      <ScenariosContainer>
        <Scenarios className='cse-ui-scroller-thumbonly'>
          { scenarios.map((scenario: ScenarioMatch) => <Scenario info={scenario}></Scenario>) }
        </Scenarios>
      </ScenariosContainer>
    );
  }

  private loading = () => {
    return <LoadingScenarios>Loading ...</LoadingScenarios>;
  }

  private onClose = () => {
    game.trigger(HUDNAV_NAVIGATE, ME);
  }
}

export default ScenarioJoin;
