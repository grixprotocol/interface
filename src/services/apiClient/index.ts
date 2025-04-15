import axios from 'axios';

import { config, env } from '../../config';

export const apiClient = axios.create({
  baseURL: 'https://z61hgkwkn8.execute-api.us-east-1.amazonaws.com/dev', //temp
  headers: {
    'x-api-key': config[env].apiKey,
  },
});
