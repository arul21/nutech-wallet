import axios from '../axiosConfig';

export const getBalanceService = async () => {
  try {
    const response = await axios.get('/balance');
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};

export const addBalanceService = async amount => {
  try {
    const response = await axios.post('/topup', {amount});
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};

export const transferBalanceService = async amount => {
  try {
    const response = await axios.post('/transfer', {amount});
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};
