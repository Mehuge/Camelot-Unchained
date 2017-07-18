/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Andrew Jackson (jacksonal300@gmail.com)
 * @Date: 2017-07-16 12:04:10
 * @Last Modified by: Andrew Jackson (jacksonal300@gmail.com)
 * @Last Modified time: 2017-07-18 17:00:11
 */

// IMPORTANT: This component is the shared code between the EditFilterButtonMenu and FilterButtonList components.

import * as _ from 'lodash';
import { client } from 'camelot-unchained';
import { defaultFilterButtonIcons, InventoryFilterButton } from '../../../lib/constants';

const inventoryFilterButtonLocalStorageKey =  `inventoryFilterButton${client.characterID}`;

export interface FilterButtonState {
  filterButtons: InventoryFilterButton[]; // Describes which filter buttons to display in InventoryHeader.
}

export function getInitialFilterButtonState(): FilterButtonState {
  return {
    filterButtons: defaultFilterButtonIcons,
  };
}

export function getFilterButtons(): InventoryFilterButton[] {
  return JSON.parse(localStorage.getItem(inventoryFilterButtonLocalStorageKey));
}

export function setFilterButtons(filterButtons: InventoryFilterButton[]) {
  localStorage.setItem(inventoryFilterButtonLocalStorageKey, JSON.stringify(filterButtons));
}

export function initializeFilterButtons(state: FilterButtonState) {
  localStorage.clear();
  const inventoryFilterButtons: InventoryFilterButton[] = getFilterButtons();
  if (!inventoryFilterButtons) {
    setFilterButtons(defaultFilterButtonIcons);
    return {
      ...state,
      filterButtons: defaultFilterButtonIcons,
    };
  }
  return {
    ...state,
    filterButtons: inventoryFilterButtons,
  };
}

export function addFilterButton(filterButton: InventoryFilterButton, state: FilterButtonState) {
  const filterButtons = getFilterButtons().concat(filterButton);
  setFilterButtons(filterButtons);
  return {
    ...state,
    filterButtons,
  };
}

export function removeFilterButton(filterButton: InventoryFilterButton, state: FilterButtonState) {
  const filterButtons = _.filter(getFilterButtons(), button => filterButton.name !== button.name);
  setFilterButtons(filterButtons);
  return {
    ...state,
    filterButtons,
  };
}
