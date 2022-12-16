import {
  GET_BALANCE_REQUEST,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE,
  ADD_BALANCE_REQUEST,
  ADD_BALANCE_SUCCESS,
  ADD_BALANCE_FAILURE,
  TRANSFER_BALANCE_REQUEST,
  TRANSFER_BALANCE_SUCCESS,
  TRANSFER_BALANCE_FAILURE,
} from './types';

export const getBalanceRequest = () => ({
  type: GET_BALANCE_REQUEST,
});

export const getBalanceSuccess = data => ({
  type: GET_BALANCE_SUCCESS,
  payload: {data},
});

export const getBalanceFailure = error => ({
  type: GET_BALANCE_FAILURE,
  payload: {error},
});

export const addBalanceRequest = (amount, callback) => ({
  type: ADD_BALANCE_REQUEST,
  payload: {amount, callback},
});

export const addBalanceSuccess = () => ({
  type: ADD_BALANCE_SUCCESS,
});

export const addBalanceFailure = error => ({
  type: ADD_BALANCE_FAILURE,
  payload: {error},
});

export const transferBalanceRequest = (amount, callback) => ({
  type: TRANSFER_BALANCE_REQUEST,
  payload: {amount, callback},
});

export const transferBalanceSuccess = () => ({
  type: TRANSFER_BALANCE_SUCCESS,
});

export const transferBalanceFailure = error => ({
  type: TRANSFER_BALANCE_FAILURE,
  payload: {error},
});
