import {
  GET_TRANSACTION_HISTORY_REQUEST,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAILURE,
} from './types';

export const getTransactionRequest = () => ({
  type: GET_TRANSACTION_HISTORY_REQUEST,
});

export const getTransactionSuccess = data => ({
  type: GET_TRANSACTION_HISTORY_SUCCESS,
  payload: {data},
});

export const getTransactionFailure = error => ({
  type: GET_TRANSACTION_HISTORY_FAILURE,
  payload: {error},
});
