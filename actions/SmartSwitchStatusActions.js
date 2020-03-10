import {
  UPDATE_SS_REQUEST_STATUS,
  UPDATE_SS_REQUEST_SUCCESS,
  UPDATE_SS_MOUNT_WV,
} from '../actionTypes';

/**
 * Set new RequestStatus to redux state
 * @param {Object} payload
 */
export const updateSSRequestStatus = payload => {
  return {type: UPDATE_SS_REQUEST_STATUS, payload: payload};
};

/**
 * Set new RequestSuccess to redux state
 * @param {Object} payload
 */
export const updateSSRequestSuccess = payload => {
  return {type: UPDATE_SS_REQUEST_SUCCESS, payload: payload};
};

/**
 * Set new MountWV to redux state
 * @param {Object} payload
 */
export const updateSSMountWV = payload => {
  return {type: UPDATE_SS_MOUNT_WV, payload: payload};
};
