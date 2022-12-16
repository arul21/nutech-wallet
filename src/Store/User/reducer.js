import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './types';
import {AUTH_LOGOUT} from '../Auth/types';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action?.payload?.data,
      };
    case GET_PROFILE_FAILURE:
    case UPDATE_PROFILE_FAILURE:
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
