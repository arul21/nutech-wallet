import {takeEvery, all, put, call} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_LOGIN_REQUEST, AUTH_REGISTER_REQUEST} from './types';
import {
  authLoginSuccess,
  authLoginFailure,
  authRegisterFailure,
  authRegisterSuccess,
} from './action';

import {authLoginService, authRegisterService} from './service';

function* authLoginSaga({payload: {authData, callback}}) {
  try {
    const response = yield call(authLoginService, authData);
    const {data} = response;
    yield put(authLoginSuccess(data?.data, data?.data?.token));
    AsyncStorage.setItem('token', data?.data?.token);
    if (typeof callback === 'function') callback(response);
  } catch (error) {
    yield put(authLoginFailure(error));
    if (typeof callback === 'function') callback(error);
  }
}

function* authRegisterSaga({payload: {authData, callback}}) {
  try {
    const response = yield call(authRegisterService, authData);
    const {data} = response;
    yield put(authRegisterSuccess(data?.data));
    if (typeof callback === 'function') callback(response);
  } catch (error) {
    yield put(authRegisterFailure, error);
    if (typeof callback === 'function') callback(error);
  }
}

export default function* Saga() {
  yield all([takeEvery(AUTH_LOGIN_REQUEST, authLoginSaga)]);
  yield all([takeEvery(AUTH_REGISTER_REQUEST, authRegisterSaga)]);
}
