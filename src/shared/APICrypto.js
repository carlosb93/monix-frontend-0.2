import axios from 'axios';

import { API_KEY, LIMIT_PER_PAGE, apiBaseURL } from '../constants/api';
// Create axios client, pre-configured with baseURL
let APICrypto = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
});


export default APICrypto;
