
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import {
  TabbedDialogWithSideMenu,
  DialogDefinition,
  DialogButton,
  MenuOption,
  DialogContent,
} from '../../widgets/UI';

const COLLECT: DialogButton = { label: 'Collect All' };

const DIALOG_DEFINITION: DialogDefinition = {
  title: 'progression',
  heading: false,
  buttons: [COLLECT],
};

interface Sample2Props {
  onClose?: () => void;
}

export class Sample2 extends React.PureComponent<Sample2Props, any> {
  public render() {
    return (
      <TabbedDialogWithSideMenu
        definition={DIALOG_DEFINITION}
        onClose={this.props.onClose}
        onAction={(tab, action) => this.onAction(tab, action, this.props.onClose)}>
        {this.renderContent}
      </TabbedDialogWithSideMenu>
    );
  }

  private renderContent = (option: MenuOption, tab: DialogButton) => {
    return (
      <DialogContent>
        <div>Sample 2 Content</div>
      </DialogContent>
    );
  }

  private onAction = (tab: DialogButton, action: DialogButton, onClose: () => void) => {
    console.log('perform action ' + action.label);
    switch (action) {
      case COLLECT:
        onClose();
        break;
    }
  }
}

export default Sample2;
