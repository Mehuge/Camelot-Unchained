import * as React from 'react';
import { TabbedDialog, DialogButton, DialogTab } from './TabbedDialog';
import { SideMenu, MenuOption, DialogContent } from './SideMenu';

// Re-export these for convenience
export { DialogButton, DialogTab, MenuOption, DialogContent };

interface TabDefinition {
  id: number | string;
  tab: DialogButton;
  options?: MenuOption[];
  buttons?: DialogButton[];
}

export interface DialogDefinition {
  name?: string;
  title: string;
  tabs: TabDefinition[];
}

interface TabbedDialogWithSideMenuProps {
  definition: DialogDefinition;
  onClose: () => void;
  onAction?: (tab: DialogButton, action: DialogButton) => void;
  children?: any;
}

/* tslint:disable:function-name */
export function TabbedDialogWithSideMenu(props: TabbedDialogWithSideMenuProps) {
  const { definition, children } = props;
  const { tabs } = definition;
  return (
    <TabbedDialog
      title={definition.title}
	    tabs={definition.tabs.map(tab => tab.tab)}
	    name={definition.name}
      onClose={props.onClose}>{
        (tab: DialogButton) => tabs.filter(tabDef => tabDef.tab === tab).map(tabDef =>
          <DialogTab buttons={tabDef.buttons} onAction={button => props.onAction(tab, button)}>
            <SideMenu name={definition.name} id={`${tabDef.id}`}
              options={tabDef.options}>
              {option => children && children(option, tab)}
            </SideMenu>
          </DialogTab>)
    }</TabbedDialog>
  );
}
