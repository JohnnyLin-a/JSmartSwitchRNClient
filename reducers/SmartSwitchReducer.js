import {
  UPDATE_SS_REQUEST_STATUS,
  UPDATE_SS_REQUEST_SUCCESS,
  UPDATE_SS_MOUNT_WV,
} from '../actionTypes';

const initialState = {
  requestStatus: [],
  requestSuccess: [],
  mountWV: [],
};

/**
 * SmartSwitch related redux reducer
 * @param {Object} state
 * @param {Object} action
 */
const smartSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SS_REQUEST_STATUS:
      return {...state, requestStatus: action.payload};
    case UPDATE_SS_REQUEST_SUCCESS:
      return {...state, requestSuccess: action.payload};
    case UPDATE_SS_MOUNT_WV:
      return {...state, mountWV: action.payload};
    default:
      return state;
  }
};

export default smartSwitchReducer;
