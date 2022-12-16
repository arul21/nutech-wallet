import {combineReducers} from 'redux';
import Auth from './Auth/reducer';
import Balance from './Balance/reducer';
import TransactionHistory from './History/reducer';
import User from './User/reducer';

const appReducer = combineReducers({
  Auth,
  User,
  Balance,
  TransactionHistory,
});

export default appReducer;
