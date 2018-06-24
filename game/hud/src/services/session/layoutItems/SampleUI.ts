/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { LayoutMode } from '../../../components/HUDDrag';
import SampleUI, { SampleUIDimensions } from '../../../components/SampleUI';
import HUDZOrder from '../HUDZOrder';

export default {
  position: {
    x: {
      anchor: 5,
      offset: -(SampleUIDimensions.width / 2),
    },
    y: {
      anchor: 5,
      offset: -(SampleUIDimensions.height / 2),
    },
    size: {
      width: SampleUIDimensions.width,
      height: SampleUIDimensions.height,
    },
    scale: 1,
    opacity: 1,
    visibility: true,
    zOrder: HUDZOrder.SampleUI,
    layoutMode: LayoutMode.GRID,
  },
  dragOptions: {
    lockHeight: true,
    lockWidth: true,
  },
  component: SampleUI,
  props: {},
};
