import axios from 'axios';
import { useAuthStore } from "../stores";

// Нельзя использовать хук или состояние напрямую вне компонента
// Создаем отдельный экземпляр хранилища
const authStore = useAuthStore.getState();

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );
        
        const { accessToken, user } = response.data;
        localStorage.setItem('accessToken', accessToken);
        
        // Обновляем пользователя в хранилище
        if (user) {
          authStore.setUser(user);
        }
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Полная очистка и редирект
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        authStore.setUser(null);
        
        // Проверяем, что мы на клиенте перед использованием window
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Обработка других ошибок
    // if (error.response?.status === 403) {
    //   if (typeof window !== 'undefined') {
    //     window.location.href = '/auth/forbidden';
    //   }
    // }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;