import {UPDATE_SS_TEXT_STATUS} from '../actionTypes';

export const updateSSTextStatus = payload => {
  return {type: UPDATE_SS_TEXT_STATUS, payload: payload};
};
