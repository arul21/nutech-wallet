import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGOUT,
} from './types';

export const authLoginRequest = (authData, callback) => ({
  type: AUTH_LOGIN_REQUEST,
  payload: {authData, callback},
});

export const authLoginSuccess = (data, token) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: {data, token},
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  payload: {error},
});

export const authLogout = () => {
  AsyncStorage.clear();
  return {
    type: AUTH_LOGOUT,
  };
};

export const authRegisterRequest = (authData, callback) => ({
  type: AUTH_REGISTER_REQUEST,
  payload: {authData, callback},
});

export const authRegisterSuccess = (data, token) => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: {data, token},
});

export const authRegisterFailure = error => ({
  type: AUTH_REGISTER_FAILURE,
  payload: {error},
});
