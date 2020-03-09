import {
  UPDATE_SS_REQUEST_STATUS,
  UPDATE_SS_REQUEST_SUCCESS,
  UPDATE_SS_MOUNT_WV,
} from '../actionTypes';

export const updateSSRequestStatus = payload => {
  return {type: UPDATE_SS_REQUEST_STATUS, payload: payload};
};

export const updateSSRequestSuccess = payload => {
  return {type: UPDATE_SS_REQUEST_SUCCESS, payload: payload};
};

export const updateSSMountWV = payload => {
  return {type: UPDATE_SS_MOUNT_WV, payload: payload};
};
