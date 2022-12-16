import axios from '../axiosConfig';

export const getTransactionHistoryService = async () => {
  try {
    const response = await axios.get('/transactionHistory');
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};
