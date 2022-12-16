import {takeEvery, all, put, call} from 'redux-saga/effects';
import {GET_TRANSACTION_HISTORY_REQUEST} from './types';
import {getTransactionFailure, getTransactionSuccess} from './action';
import {getTransactionHistoryService} from './service';

function* getTransactionHistorySaga() {
  try {
    const response = yield call(getTransactionHistoryService);
    const {data} = response;
    yield put(getTransactionSuccess(data?.data));
  } catch (error) {
    yield put(getTransactionFailure(error));
  }
}

export default function* Saga() {
  yield all([
    takeEvery(GET_TRANSACTION_HISTORY_REQUEST, getTransactionHistorySaga),
  ]);
}
