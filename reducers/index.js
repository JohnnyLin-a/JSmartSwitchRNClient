import {combineReducers} from 'redux';
import smartSwitchReducer from './SmartSwitchReducer';

/**
 * Root reducer, combined reducers
 */
const rootReducer = combineReducers({
  smartSwitch: smartSwitchReducer,
});

export default rootReducer;
