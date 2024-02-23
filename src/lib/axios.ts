import { API_URL } from '@/config';
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

// Handle response data and handle error
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = 'Error fetching data, please try again.';
    alert(message);
    return Promise.reject(error);
  }
);
