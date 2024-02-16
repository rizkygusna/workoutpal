import { API_URL } from '@/config';
import { Axios } from 'axios';

export const axios = new Axios({ baseURL: API_URL });
