import { API_URL } from '@/config';
import { Axios } from 'axios';

export const axios = new Axios({ baseURL: API_URL });

// Handle response data and handle error
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = 'Error fetching data, please try again.';
    alert(message);
    return Promise.reject(error);
  }
);
