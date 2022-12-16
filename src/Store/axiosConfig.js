import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './index';
import {authLogout} from './actions';

const getToken = async user => {
  try {
    let token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const instance = axios.create({
  baseURL: 'https://tht-api.nutech-integrasi.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    if (error?.response?.data?.status === 108) {
      store.dispatch(authLogout());
    }
    return Promise.reject(error);
  },
);

export default instance;
