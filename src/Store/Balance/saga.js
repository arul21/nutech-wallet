import {takeEvery, all, put, call} from 'redux-saga/effects';

import {
  GET_BALANCE_REQUEST,
  ADD_BALANCE_REQUEST,
  TRANSFER_BALANCE_REQUEST,
} from './types';
import {
  getBalanceSuccess,
  getBalanceFailure,
  addBalanceFailure,
  addBalanceSuccess,
  transferBalanceFailure,
  transferBalanceSuccess,
} from './action';
import {
  getBalanceService,
  addBalanceService,
  transferBalanceService,
} from './service';

function* getBalanceSaga() {
  try {
    const response = yield call(getBalanceService);
    const {data} = response;
    yield put(getBalanceSuccess(data?.data));
  } catch (error) {
    yield put(getBalanceFailure(error));
  }
}

function* addBalanceSaga({payload: {amount, callback}}) {
  try {
    const response = yield call(addBalanceService, amount);
    yield put(addBalanceSuccess());
    yield put({type: 'GET_BALANCE_REQUEST'});
    yield put({type: 'GET_TRANSACTION_HISTORY_REQUEST'});
    if (typeof callback === 'function') callback(response);
  } catch (error) {
    yield put(addBalanceFailure(error));
    if (typeof callback === 'function') callback(error);
  }
}

function* transferBalanceSaga({payload: {amount, callback}}) {
  try {
    const response = yield call(transferBalanceService, amount);
    yield put(transferBalanceSuccess());
    yield put({type: 'GET_BALANCE_REQUEST'});
    yield put({type: 'GET_TRANSACTION_HISTORY_REQUEST'});
    if (typeof callback === 'function') callback(response);
  } catch (error) {
    yield put(transferBalanceFailure(error));
    if (typeof callback === 'function') callback(error);
  }
}

export default function* Saga() {
  yield all([takeEvery(GET_BALANCE_REQUEST, getBalanceSaga)]);
  yield all([takeEvery(ADD_BALANCE_REQUEST, addBalanceSaga)]);
  yield all([takeEvery(TRANSFER_BALANCE_REQUEST, transferBalanceSaga)]);
}
