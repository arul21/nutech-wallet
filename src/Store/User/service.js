import axios from '../axiosConfig';

export const getProfileService = async () => {
  try {
    const response = await axios.get('/getProfile');
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};

export const updateProfileService = async data => {
  try {
    const response = await axios.post('/updateProfile', data);
    return response;
  } catch (error) {
    return Promise.reject(error?.response || error);
  }
};
