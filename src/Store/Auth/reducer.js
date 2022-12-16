import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGOUT,
} from './types';

const initialState = {
  user: {},
  token: null,
  isLoading: false,
  error: null,
  isLogin: false,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload?.data,
        token: action.payload?.token,
        isLogin: true,
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        error: action.payload?.error,
      };
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error,
      };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
