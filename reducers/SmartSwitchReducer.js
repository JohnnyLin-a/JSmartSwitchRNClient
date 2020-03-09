import {UPDATE_SS_TEXT_STATUS} from '../actionTypes';

const initialState = {
  requestStatus: [],
};

const smartSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SS_TEXT_STATUS:
      return {...state, requestStatus: action.payload};
    default:
      return state;
  }
};

export default smartSwitchReducer;
