/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

import * as React from 'react';
import styled from 'react-emotion';
import { Spinner } from '@csegames/camelot-unchained';
import { CharacterProgressionData, CharacterAdjustmentDBModel } from '@csegames/camelot-unchained/lib/graphql/schema';
import { GraphQL, GraphQLResult } from '@csegames/camelot-unchained/lib/graphql/react';

const progressionAdjustmentFragments = `
  fragment SkillPartLevelReason on CharacterAdjustmentReasonSkillPartLevel {
    skillPartID
    skillPartLevel
  }

  fragment UseSkillPartReason on CharacterAdjustmentReasonUseSkillPart {
    skillID
    inCombatCount
    nonCombatCount
  }

  fragment UseSkillsReason on CharacterAdjustmentReasonUseSkills {
    inCombatCount
    nonCombatCount
  }

  fragment AddItemAdjustment on CharacterAdjustmentAddItem {
    itemInstanceIDS
    staticDefinitionID
    unitCount
    quality
  }

  fragment PlayerStatAdjustment on CharacterAdjustmentPlayerStat {
    playerStat
    previousBonus
    newBonus
    previousProgressionPoints
    newProgressionPoints
  }

  fragment SkillPartAdjustment on CharacterAdjustmentSkillPartProgress {
    skillPartID
    previousLevel
    previousProgressionPoints
    newLevel
    newProgressPoints
  }

  fragment SkillNodeAdjustment on CharacterAdjustmentApplySkillNode {
    skillNodePath
  }

  fragment AdjustmentModel on CharacterAdjustmentDBModel {
    reason {
      skillPartLevel {
        ...SkillPartLevelReason
      }
      useSkillPart {
        ...UseSkillPartReason
      }
      useSkills {
        ...UseSkillsReason
      }
    }
    adjustment {
      addItem {
        ...AddItemAdjustment
      }
      playerStat {
        ...PlayerStatAdjustment
      }
      skillPart {
        ...SkillPartAdjustment
      }
      skillNode {
        ...SkillNodeAdjustment
      }
    }
  }
`;

const adjustmentsByDayLogIDQuery = (logID: string) => `
${progressionAdjustmentFragments}
{
  myprogression {
    adjustmentsByDayLogID(logID: "${logID}") {
      ...AdjustmentModel
    }
  }
}
`;

const LoadingContainer = styled('div')`
  position: relative;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 400px;
  padding: 20px;
  background-color: gray;
  color: white;
`;

type QueryType = {
  myprogression: CharacterProgressionData;
};

export interface Props {
  logID: string;
}

export interface State {

}

class RewardsView extends React.Component<Props, State> {
  showRewards(progressionData: CharacterProgressionData) {
    let adjustmentsElement: JSX.Element[] = [];
    if (!progressionData.adjustmentsByDayLogID || progressionData.adjustmentsByDayLogID.length === 0) {
      adjustmentsElement.push(<div className="NoReward">No new rewards.</div>);
    } else {
      progressionData.adjustmentsByDayLogID.map((adjustment: CharacterAdjustmentDBModel, adjustmentID: number) => {
        const { addItem, playerStat, skillNode, skillPart } = adjustment.adjustment;
        const { skillPartLevel, useSkillPart, useSkills, adminGrant } = adjustment.reason;

        let reasonDescription = '';
        if (skillPartLevel) {
          // Reason is skill level up
          reasonDescription = `Skill Leveled Up: ${skillPartLevel.skillPartID}`;
        } else if (useSkillPart) {
          // Reason is individual skill usage
          reasonDescription = `Used ${useSkillPart.skillID}: ${useSkillPart.inCombatCount + useSkillPart.nonCombatCount}`;
        } else if (useSkills) {
          // Reason is any skill usage
          reasonDescription = `Any Skill Used: ${useSkills.inCombatCount + useSkills.nonCombatCount}`;
        } else if (adminGrant) {
          // Given by administrator
          reasonDescription = `Granted by administrator.`;
        }

        let adjustmentDescription: JSX.Element[] = [];
        if (addItem) {
          // Adjustment is a new item
          adjustmentDescription.push(
            <li>
              <div>Item{addItem.unitCount > 1 ? 's' : null} Received:</div><div>{addItem.unitCount}x {addItem.staticDefinitionID}</div><br />
              <div>Reason:</div><div>{reasonDescription}</div>
            </li>
          );
        } else if (playerStat) {
          // Adjustment is stat progression
          if (playerStat.newBonus !== playerStat.previousBonus) {
            adjustmentDescription.push(
              <li>
                <div>Attribute Bonus Applied:</div><div>+{playerStat.newBonus - playerStat.previousBonus} to {playerStat.playerStat}</div><br />
                <div>Reason:</div><div>{reasonDescription}</div>
              </li>
            );
          }
          if (playerStat.newProgressionPoints - playerStat.previousProgressionPoints > 0) {
            adjustmentDescription.push(
              <li>
                <div>Attribute Progression Increase:</div><div>{playerStat.newProgressionPoints - playerStat.previousProgressionPoints} points for {playerStat.playerStat}</div><br />
                <div>Reason:</div><div>{reasonDescription}</div>
              </li>
            );
          }
        } else if (skillNode) {
          // Adjustment is a skill node
          adjustmentDescription.push(
            <li>
              <div>Skill Node Applied:</div><div>{skillNode.skillNodePath}</div><br />
              <div>Reason:</div><div>{reasonDescription}</div>
            </li>
          );
        } else if (skillPart) {
          // Adjustment is skill progression
          // **TODO add skillpart icons when GQL updated
          if (skillPart.newLevel !== skillPart.previousLevel) {
            adjustmentDescription.push(
              <li>
                <div>New Skill Level Obtained:</div><div>Level {skillPart.newLevel} {skillPart.skillPartID}</div><br />
                <div>Reason:</div><div>{reasonDescription}</div>
              </li>
            );
          }
          if (skillPart.newProgressPoints - skillPart.previousProgressionPoints > 0) {
            adjustmentDescription.push(
              <li>
                <div>Skill Progression Increase:</div><div>{skillPart.newProgressPoints - skillPart.previousProgressionPoints} points for {skillPart.skillPartID}</div><br />
                <div>Reason:</div><div>{reasonDescription}</div>
              </li>
            );
          }
        }

        adjustmentDescription.map((adjustment) => {
          adjustmentsElement.push(adjustment);
        });

      });
    }
    return adjustmentsElement;
  }

  public render() {
    const query = adjustmentsByDayLogIDQuery(this.props.logID);
    return (
      <GraphQL query={query}>
        {(graphql: GraphQLResult<QueryType>) => {
          if (graphql.lastError && graphql.lastError !== 'OK') {
            return (
              <LoadingContainer>
                <div>{graphql.lastError}</div>
              </LoadingContainer>
            )
          }
          if (graphql.loading || !graphql.data || !graphql.data.myprogression) {
            return (
              <LoadingContainer>
                <div>Loading...</div>
                <Spinner />
              </LoadingContainer>
            );
          }
          return (
            <ul>{ this.showRewards(graphql.data.myprogression) }</ul>
          );
        }}
      </GraphQL>
    );
  }
}

export default RewardsView;
