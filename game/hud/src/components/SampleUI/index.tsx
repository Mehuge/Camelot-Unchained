/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { HudNavWindow } from '../HudNavWindow';
import { Sample1 } from './Sample1';
import { Sample2 } from './Sample2';
import { Sample3 } from './Sample3';

const SAMPLE_DIALOG_WIDTH = 1024;
const SAMPLE_DIALOG_HEIGHT = 768;

interface Size {
  width: number;
  height: number;
}

export const SampleUIDimensions: Size = {
  width: SAMPLE_DIALOG_WIDTH,
  height: SAMPLE_DIALOG_HEIGHT,
};

const samples = [
  Sample1,
  Sample2,
  Sample3,
];

/* tslint:disable:function-name */
export function SampleUI() {
  return (
    <HudNavWindow name='sample'>
      {(onClose) => {
        const RenderSample = samples[Date.now() % samples.length];
        return <RenderSample onClose={onClose}/>;
      }}
    </HudNavWindow>
  );
}

export default SampleUI;
