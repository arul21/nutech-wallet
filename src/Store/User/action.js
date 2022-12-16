import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './types';

export const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST,
});

export const getProfileSuccess = data => ({
  type: GET_PROFILE_SUCCESS,
  payload: {data},
});

export const getProfileFailure = error => ({
  type: GET_PROFILE_FAILURE,
  payload: {error},
});

export const updateProfileRequest = (dataUpdate, callback) => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: {dataUpdate, callback},
});

export const updateProfileSuccess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: {data},
});

export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: {error},
});
