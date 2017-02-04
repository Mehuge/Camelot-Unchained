import {Module, generateID} from 'redux-typed-modules';
import {ConfigItem, getItems} from '../services/config';

export interface ConfigState {
  items: ConfigItem[]
}

const module = new Module<ConfigState, any>({
  initialState: { items: getItems() }
});

// SET_CONFIG_VARS

interface GotConfigVarsAction {
  id: String;
  items: ConfigItem[]
}

interface GotConfigVarsArgs {
  items: ConfigItem[]
}

export const updateConfigVars = module.createAction<GotConfigVarsAction, GotConfigVarsArgs>({
  action: (args) => {
    return { id: 'GOT_CONFIG_VARS', items: args.items };
  },
  reducer: (state, action) => {
    console.log('State: ' + JSON.stringify(state));
    console.log('Action: ' + JSON.stringify(action));
    return Object.assign({}, state, {
      items: action.items.slice(0)
    });
  }
});

// SET_CONFIG_VAR

interface SetConfigVarAction {
  id: String,
  name: String,
  value: String
}

interface SetConfigVarArgs {
  name: String,
  value: String
}

export const setConfigVar = module.createAction<SetConfigVarAction, SetConfigVarArgs>({
  action: (args) => {
    return { id: 'SET_CONFIG_VAR', name: args.name, value: args.value };
  },
  reducer: (state, action) => {
    return Object.assign({}, state, {
      items: state.items.map((item) => {
        if (item.name == action.name) {
          return Object.assign({}, item, { value: action.value });
        }
        return item;
      })
    });
  }
});

export default module.createReducer();