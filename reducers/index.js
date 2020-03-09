import {combineReducers} from 'redux';
import smartSwitchReducer from './SmartSwitchReducer';

const rootReducer = combineReducers({
  smartSwitch: smartSwitchReducer,
});

export default rootReducer;
