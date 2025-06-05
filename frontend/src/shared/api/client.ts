import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3001',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});