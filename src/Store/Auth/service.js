import axios from '../axiosConfig';

export const authLoginService = async data => {
  try {
    const response = await axios.post('/login', data);
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};

export const authRegisterService = async data => {
  try {
    const response = await axios.post('/registration', data);
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};
