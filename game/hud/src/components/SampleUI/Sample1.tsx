
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
  Box,
  SubHeading,
  Field,
  CheckBoxField,
  SliderField,
} from '../../widgets/UI';

const TAB_MAIN: DialogButton = { label: 'UI' };
const TAB_NOTMAIN: DialogButton = { label: 'Components' };
const TAB_WEB: DialogButton = { label: 'Web' };

const OK: DialogButton = { label: 'OK' };
const CANCEL: DialogButton = { label: 'Cancel' };

const OPT_UI_WIDGETS: MenuOption = { label: 'UI Widgets' };
const OPT_SECOND: MenuOption = { label: 'Second Option' };
const OPT_THIRD: MenuOption = { label: 'Third Option' };
const OPT_FOURTH: MenuOption = { label: 'Fourth Option' };
const OPT_FIFTH: MenuOption = { label: 'Fifth Option' };
const OPT_SIXTH: MenuOption = { label: 'Sixth Option' };

const OPT_ABOUT: MenuOption = { label: 'About' };
const OPT_BETA_1_DOC: MenuOption = { label: 'Beta 1 Doc' };
const OPT_REALMS: MenuOption = { label: 'Realms' };
const OPT_LORE: MenuOption = { label: 'Lore' };

const DIALOG_DEFINITION: DialogDefinition = {
  title: 'Sample UI',
  name: 'sample',
  tabs: [
    { id: 1, tab: TAB_MAIN, options: [OPT_UI_WIDGETS, OPT_SECOND, OPT_THIRD], buttons: [OK, CANCEL] },
    { id: 2, tab: TAB_NOTMAIN, options: [OPT_FOURTH, OPT_FIFTH, OPT_SIXTH], buttons: [CANCEL] },
    { id: 3, tab: TAB_WEB, options: [OPT_ABOUT, OPT_BETA_1_DOC, OPT_REALMS, OPT_LORE] },
  ],
};

/* tslint:disable:function-name */
function Go(url: string) {
  return <iframe style={{ width: '100%', height: '100%', flex: 1, border: 0 }} src={url}></iframe>;
}

/* tslint:disable:function-name */
function UIWidgets() {
  function Fields(justify?: string) {
    return (
      <>
        <SubHeading>Box{ justify ? ` justify='${justify}` : ' with Fields' }</SubHeading>
        <Box justify={justify}>
          <Field>Field 1</Field>
          <Field>Field 2</Field>
          <Field>Field 3</Field>
          <Field>Field 4</Field>
        </Box>
      </>
    );
  }
  return (
    <DialogContent>
      <SubHeading>Box</SubHeading>
      <Box>
        This is a box. You can put things in a box.
        This is a special box though because the box will grow to fit the content.
      </Box>
      { Fields() }
      { Fields('space-between') }
      { Fields('space-around') }
      { Fields('space-evenly') }
      <SubHeading>CheckBox Fields</SubHeading>
      <CheckBoxField label='Check Me' id='check1' on={true}/>
      <CheckBoxField label='Check Me' id='check2' on={false}/>
      <SubHeading>Slider Fields</SubHeading>
      <SliderField label='Slide Me' id='slider1' current={100} min={0} max={1000}/>
      <SliderField label='Slide Me Too' id='slider2' current={5000} min={0} max={10000} logrithmic={true}/>
    </DialogContent>
  );
}

interface Sample1Props {
  onClose?: () => void;
}

export class Sample1 extends React.PureComponent<Sample1Props, any> {
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
    switch (option) {
      case OPT_UI_WIDGETS: return UIWidgets();
      case OPT_SECOND: return <div>second option</div>;

      case OPT_THIRD: return <div>last option</div>;
      case OPT_FOURTH: return <div>content for {option.label}</div>;
      case OPT_FIFTH: return <div>second option</div>;
      case OPT_SIXTH: return <div>last option</div>;

      case OPT_ABOUT:
        return Go('http://camelotunchained.com/v3/camelot-unchained/');
      case OPT_BETA_1_DOC:
        return Go('http://camelotunchained.com/v3/beta-1/');
      case OPT_REALMS:
        return Go('http://camelotunchained.com/v3/realms/');
      case OPT_LORE:
        return Go('http://camelotunchained.com/v3/lore/');
    }
  }

  private onAction = (tab: DialogButton, action: DialogButton, onClose: () => void) => {
    console.log('perform action ' + action.label + ' for tab ' + tab.label);
    switch (action) {
      case OK:
        onClose();
        break;
    }
  }
}

export default Sample1;
