import axios from 'axios';

export const axiosInterceptors = (user) => {
  axios.interceptors.request.use(
    (config) => {
      const token = user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => Promise.reject(error),
  );
};
