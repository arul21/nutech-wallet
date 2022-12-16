import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
// const middlewares = [sagaMiddleware, logger];
const middlewares = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(...middlewares),
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
