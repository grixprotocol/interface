import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://z61hgkwkn8.execute-api.us-east-1.amazonaws.com/dev', //temp
  headers: {
    'x-api-key': import.meta.env.VITE_GRIX_API_KEY,
  },
});
