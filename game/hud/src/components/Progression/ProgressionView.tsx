/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

import * as React from 'react';
import styled from 'react-emotion';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Spinner } from '@csegames/camelot-unchained';
import { CharacterProgressionData } from '@csegames/camelot-unchained/lib/graphql/schema';
import { GraphQLResult } from '@csegames/camelot-unchained/lib/graphql/react';
import { toSentenceCase } from '@csegames/camelot-unchained/lib/utils/textUtils';
import RewardsView from './RewardsView';
import { LoadingContainer, InnerContainer, ProgressionTitle, ProgressionCorner, ProgressionContent, ProgressionLoading, ProgressionFooter } from './style';

const Container = styled('div')`
  position: relative;
`;

const ProgressionBorder = styled('div')`
  background: url(images/progression/progression-daily-item-top.png) center bottom no-repeat;
  width: 108px;
  height: 9px;
  margin: 0 auto -4px;
}
`;

const CollectButton = styled('div')`
  &.btn {
    background: url(images/progression/button-off.png) no-repeat;
    width: 95px;
    height: 30px;;
    border: none;
    margin: 12px 16px 0 16px;
    cursor: pointer;
    color: #848484;
    font-family: 'Caudex', serif;
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
    line-height: 30px;
    &:hover {
      background: url(images/progression/button-on.png) no-repeat;
      color: #fff;
    }
  }
`;

const ProgressionFooterBorder = styled('div')`
  position: absolute;
  border: 1px solid #2e2b28;
  margin: 7px 10px 0;
  display: block;
  width: 780px;
  height: 40px;
  z-index: 3;
`;

const ProgressionFooterOuter = styled('div')` {
  position: absolute;
  z-index: 4;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ProgressionFooterLeft = styled('div')` {
  background: url(images/progression/progress-botnav-left-ornament.png) no-repeat;
  height: 55px;
  width: 75px
`;

const ProgressionFooterRight = styled('div')` {
  background: url(images/progression/progress-botnav-right-ornament.png) no-repeat;
  height: 55px;
  width: 75px
`;

const CloseButton = styled('div')`
  position: absolute;
  z-index: 11;
  top: 6px;
  right: 7px;
  width: 12px;
  height: 12px;
  background: url(images/inventory/close-button-grey.png) no-repeat;
  cursor: pointer;
  &:hover {
    -webkit-filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.9));
  }
  &:active {
    -webkit-filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 1));
  }
`;

export interface Props {
  graphql: GraphQLResult<{ myprogression: CharacterProgressionData }>;
  logIDs: string[];
  onCloseClick: () => void;
  onCollectClick: () => void;
  collected: boolean;
  collecting: boolean;
}

export interface State {

}

class ProgressionView extends React.Component<Props, State> {
  public render() {
    const { graphql } = this.props;
    if (this.props.collecting) {
      return (
        <LoadingContainer>
          <ProgressionTitle><h6>Progression</h6></ProgressionTitle>
          <InnerContainer>
            <ProgressionCorner />
            <CloseButton onClick={this.props.onCloseClick} />
            <ProgressionContent>
              <ProgressionLoading>
                <div>Collecting...</div>
                <Spinner />
              </ProgressionLoading>
            </ProgressionContent>
            <ProgressionFooter />
          </InnerContainer>
        </LoadingContainer>
      );
    }

    if (graphql.lastError && graphql.lastError !== 'OK') {
      return (
        <LoadingContainer>
          <ProgressionTitle><h6>Progression</h6></ProgressionTitle>
          <InnerContainer>
            <ProgressionCorner />
            <CloseButton onClick={this.props.onCloseClick} />
            <ProgressionContent>
              <ProgressionLoading>
                <div>{graphql.lastError}</div>
              </ProgressionLoading>
            </ProgressionContent>
            <ProgressionFooter />
          </InnerContainer>
        </LoadingContainer>
      );
    }

    if (graphql.loading || !graphql.data || !graphql.data.myprogression) {
      return (
        <LoadingContainer>
          <ProgressionTitle><h6>Progression</h6></ProgressionTitle>
          <InnerContainer>
            <ProgressionCorner />
            <CloseButton onClick={this.props.onCloseClick} />
            <ProgressionContent>
              <ProgressionLoading>
                <div>Loading...</div>
                <Spinner />
              </ProgressionLoading>
            </ProgressionContent>
            <ProgressionFooter />
          </InnerContainer>
        </LoadingContainer>
      );
    }

    if (this.props.collected || isEmpty(graphql.data.myprogression.unCollectedDayLogs)) {
      return (
        <LoadingContainer>
          <ProgressionTitle><h6>Progression</h6></ProgressionTitle>
          <InnerContainer>
            <ProgressionCorner />
            <CloseButton onClick={this.props.onCloseClick} />
            <ProgressionContent>
              <ProgressionLoading>
                <div>All progression packages have been collected</div>
              </ProgressionLoading>
            </ProgressionContent>
            <ProgressionFooter />
          </InnerContainer>
        </LoadingContainer>
      );
    }

    return (
      <Container>
        <ProgressionTitle><h6>Progression</h6></ProgressionTitle>
        <InnerContainer className="cse-ui-scroller-thumbonly">
          <CloseButton onClick={this.props.onCloseClick} />
          <ProgressionCorner />
          <ProgressionContent>

          {graphql.data.myprogression.unCollectedDayLogs.map((uncollectedDay) => {
            const { secondsActive, distanceMoved, skillPartsUsed, damage, plots, crafting, scenarios } = uncollectedDay;

            let damageDetails: JSX.Element[] = [];
            Object.keys(damage).map((damageKey) => {
              Object.keys(damage[damageKey]).map((damageType) => {
                if (damage[damageKey][damageType] > 0) {
                  damageDetails.push(
                    <li>
                      <div className="ProgressionLabel">
                        {toSentenceCase(damageKey)} ({
                          damageType === 'playerCharacter' ? 'Player' :
                          damageType === 'nonPlayerCharacter' ? 'NPC' :
                          toSentenceCase(damageType)
                        }):
                      </div>
                      <div className="ProgressionValue">{damage[damageKey][damageType]}</div>
                    </li>
                  );
                }
              });
            });

            let plotDetails: JSX.Element[] = [];
            Object.keys(plots).map((plotKey) => {
              if (plots[plotKey] > 0) plotDetails.push(<li><div className="ProgressionLabel">{toSentenceCase(plotKey)}: </div><div className="ProgressionValue">{plots[plotKey]}</div></li>);
            });

            let craftingDetails: JSX.Element[] = [];
            Object.keys(crafting).map((craftingKey) => {
              Object.keys(crafting[craftingKey]).map((craftingType) => {
                if (crafting[craftingKey][craftingType] > 0) craftingDetails.push(<li><div className="ProgressionLabel">{toSentenceCase(craftingKey)} ({toSentenceCase(craftingType)}): </div><div className="ProgressionValue">{crafting[craftingKey][craftingType]}</div></li>);
              });
            });

            let scenarioDetails: JSX.Element[] = [];
            let scenariosWon: number = 0;
            let scenariosLost: number = 0;
            let scenariosTied: number = 0;
            scenarios.map((scenario) => {
              if (scenario.outcome === 'Win') scenariosWon++;
              if (scenario.outcome === 'Lose') scenariosLost++;
              if (scenario.outcome === 'Draw') scenariosTied++;
            });
            if (scenariosWon > 0) scenarioDetails.push(<li><div className="ProgressionLabel">Scenarios Won: </div><div className="ProgressionValue">{scenariosWon}</div></li>);
            if (scenariosLost > 0) scenarioDetails.push(<li><div className="ProgressionLabel">Scenarios Lost: </div><div className="ProgressionValue">{scenariosLost}</div></li>);
            if (scenariosTied > 0) scenarioDetails.push(<li><div className="ProgressionLabel">Scenarios Tied: </div><div className="ProgressionValue">{scenariosTied}</div></li>);

            let skillDetails: JSX.Element[] = [];
            skillPartsUsed.map((skillPartUsed) => {
              skillDetails.push(
                <li>
                  <div className="ProgressionLabel">Skill Used ({ skillPartUsed.skillPartID }):</div>
                  <div className="ProgressionValue">{ skillPartUsed.usedInCombatCount + skillPartUsed.usedNonCombatCount }</div>
                </li>
              );
            });

            return (
              <div id={uncollectedDay.id}>
                <h2>{moment(uncollectedDay.dayStart).format('dddd, MMMM Do YYYY, h:mm:ss A')}</h2>
                <ProgressionBorder />
                <div className="ProgressList">
                  <ul>
                    <h3>General Details</h3>
                    { secondsActive ? (
                      <li><div className="ProgressionLabel">Time Active: </div><div className="ProgressionValue">{moment.duration(secondsActive, 'seconds').humanize()}</div></li>
                    ): null }
                    { distanceMoved ? (
                      <li><div className="ProgressionLabel">Distance Traveled: </div><div className="ProgressionValue">{distanceMoved} meters</div></li>
                    ): null }
                  </ul>
                  { damageDetails.length > 0 ? (
                    <ul>
                      <h3>Damage Details</h3>
                      {damageDetails}
                    </ul>
                  ): null }
                  { plotDetails.length > 0 ? (
                    <ul>
                      <h3>Plot Details</h3>
                      {plotDetails}
                    </ul>
                  ): null }
                  { craftingDetails.length > 0 ? (
                    <ul>
                      <h3>Crafting Details</h3>
                      {craftingDetails}
                    </ul>
                  ): null }
                  { scenarioDetails.length > 0 ? (
                    <ul>
                      <h3>Scenario Details</h3>
                      {scenarioDetails}
                    </ul>
                  ): null }
                  { skillDetails.length > 0 ? (
                    <ul>
                      <h3>Skill Details</h3>
                      {skillDetails}
                    </ul>
                  ): null }
                  <h3 className="RewardHeadline">Rewards</h3>
                  <RewardsView key={uncollectedDay.id} logID={uncollectedDay.id} />
                </div>
              </div>
            );
          })}

          </ProgressionContent>
          <ProgressionFooter>
            <ProgressionFooterBorder />
            <ProgressionFooterOuter>
                <ProgressionFooterLeft />
                <CollectButton
                  className="btn"
                  onClick={this.props.onCollectClick}>
                  Collect All
                </CollectButton>
                <ProgressionFooterRight />
            </ProgressionFooterOuter>
          </ProgressionFooter>
        </InnerContainer>
      </Container>
    );
  }
}

export default ProgressionView;
