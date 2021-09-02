import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://192.168.165.110:3000/api/v1',//http://localhost:3000/api/v1/
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `${token}`;
    return config;
  });
};

export default APIKit;
