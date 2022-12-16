import {all} from 'redux-saga/effects';
import Auth from './Auth/saga';
import Balance from './Balance/saga';
import TransactionHistory from './History/saga';
import User from './User/saga';

export default function* rootSaga() {
  yield all([Auth(), Balance(), TransactionHistory(), User()]);
}
