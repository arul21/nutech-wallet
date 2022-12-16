import {
  GET_TRANSACTION_HISTORY_REQUEST,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAILURE,
} from './types';
import {AUTH_LOGOUT} from '../Auth/types';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action?.payload?.data,
      };
    case GET_TRANSACTION_HISTORY_FAILURE:
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
