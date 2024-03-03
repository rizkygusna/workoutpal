import { API_URL } from '@/config';
import storage from '@/utils/storage';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// logging
// axiosInstance.interceptors.request.use((request) => {
//   console.log('Starting Request', request);
//   return request;
// });

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Adding an authorization header
    const token = storage.getToken();
    config.headers['authorization'] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Handle response data and handle error
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = 'Error fetching data, please try again.';
    alert(message);
    console.log(error);
    return Promise.reject(error);
  }
);
