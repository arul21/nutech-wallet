import React from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './Store';
import ApplicationNavigator from './Navigators/Applications';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider placement="top">
          <ApplicationNavigator />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
