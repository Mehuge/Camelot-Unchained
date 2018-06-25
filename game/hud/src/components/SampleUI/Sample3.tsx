
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

const DIALOG_DEFINITION: DialogDefinition = {
  title: 'camelot unchained',
  heading: false,
};

interface Sample2Props {
  onClose?: () => void;
}

export class Sample3 extends React.PureComponent<Sample2Props, any> {
  public render() {
    return (
      <TabbedDialogWithSideMenu
        definition={DIALOG_DEFINITION}
        onClose={this.props.onClose}>
        {this.renderContent}
      </TabbedDialogWithSideMenu>
    );
  }

  private renderContent = (option: MenuOption, tab: DialogButton) => {
    const style: React.CSSProperties = {
      padding: 0,
      marginTop: '-10px',
      border: '2px solid transparent',
      borderTop: 0,
    };
    return (
      <DialogContent style={style}>{Go('http://www.camelotunchained.com/')}</DialogContent>
    );
  }
}

export default Sample3;

/* tslint:disable:function-name */
function Go(url: string) {
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    flex: 1,
    border: 0,
    pointerEvents: 'all',
  };
  return <iframe style={style} src={url}></iframe>;
}
