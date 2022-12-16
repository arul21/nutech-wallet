import {takeEvery, all, put, call} from 'redux-saga/effects';
import {GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST} from './types';
import {
  getProfileSuccess,
  getProfileFailure,
  updateProfileFailure,
  updateProfileSuccess,
} from './action';
import {getProfileService, updateProfileService} from './service';

function* getProfileSaga() {
  try {
    const response = yield call(getProfileService);
    const {data} = response;
    yield put(getProfileSuccess(data?.data));
  } catch (error) {
    yield put(getProfileFailure(error));
  }
}

function* updateProfileSaga({payload: {dataUpdate, callback}}) {
  try {
    const response = yield call(updateProfileService, dataUpdate);
    const {data} = response;
    yield put(updateProfileSuccess(data?.data));
    if (typeof callback === 'function') callback(response);
  } catch (error) {
    yield put(updateProfileFailure(error));
    if (typeof callback === 'function') callback(error);
  }
}

export default function* Saga() {
  yield all([takeEvery(GET_PROFILE_REQUEST, getProfileSaga)]);
  yield all([takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga)]);
}
