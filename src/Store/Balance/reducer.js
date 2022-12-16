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
import {AUTH_LOGOUT} from '../Auth/types';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE_REQUEST:
    case ADD_BALANCE_REQUEST:
    case TRANSFER_BALANCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action?.payload?.data?.balance,
      };
    case ADD_BALANCE_SUCCESS:
    case TRANSFER_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_BALANCE_FAILURE:
    case ADD_BALANCE_FAILURE:
    case TRANSFER_BALANCE_FAILURE:
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
