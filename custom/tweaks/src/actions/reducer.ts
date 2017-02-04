import {combineReducers} from 'redux';

import config, {ConfigState} from './config';

export interface GlobalState {
  config: ConfigState
}

export default combineReducers({
  config
});