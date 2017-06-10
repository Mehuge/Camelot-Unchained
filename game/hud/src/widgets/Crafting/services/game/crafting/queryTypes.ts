/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Mehuge (mehuge@sorcerer.co.uk)
 * @Date: 2017-06-04 19:20:27
 * @Last Modified by: Mehuge (mehuge@sorcerer.co.uk)
 * @Last Modified time: 2017-06-10 22:21:41
 */

interface VoxStaticDefinition {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
}

interface VoxStatsItem {
  quality: number;
  mass: number;
  unitCount: number;
}

interface VoxItemStats {
  item: VoxStatsItem;
}

interface VoxItem {
  id: string;
  shardID: number;
  stats: VoxItemStats;
  staticDefinition: VoxStaticDefinition;
}

interface VoxIngredient extends VoxItem {
  givenName: string;
}

interface VoxPossibleIngredient extends VoxIngredient {}

interface VoxSelectedRecipe {
  id: string;
}

interface VoxSelectedTemplate extends VoxSelectedRecipe {}

interface VoxStatus {
  voxState: string;
  jobType: string;
  jobState: string;
  startTime: string;
  totalCraftingTime: number;
  givenName: string;
  itemCount: number;
  recipeID: string;
  endQuality: number;
  usedRepairPoints: number;
  ingredients: VoxIngredient[];
  template: VoxSelectedTemplate;
  possibleIngredients: VoxPossibleIngredient[];
}

interface VoxRecipe {
  id: string;
  outputItem: {
    name: string;
    iconUrl: string;
    description: string;
  };
}

interface VoxTemplate {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
}

interface VoxOutputItem extends VoxItem { }

export {
  VoxItem,
  VoxOutputItem,
  VoxIngredient,
  VoxSelectedRecipe,
  VoxSelectedTemplate,
  VoxTemplate,
  VoxRecipe,
  VoxStatus,
  VoxPossibleIngredient,
};
