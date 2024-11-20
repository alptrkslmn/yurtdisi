import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dil yönetimi API'leri
export const languageAPI = {
  // Tüm dilleri getir
  getAll: () => api.get('/languages'),
  
  // Belirli bir dili getir
  getOne: (code) => api.get(`/languages/${code}`),
  
  // Yeni dil ekle
  create: (data) => api.post('/languages', data),
  
  // Dil güncelle
  update: (code, data) => api.put(`/languages/${code}`, data),
  
  // Dil sil
  delete: (code) => api.delete(`/languages/${code}`),
  
  // Dil çevirilerini getir
  getTranslations: (code) => api.get(`/languages/${code}/translations`),
  
  // Dil çevirilerini güncelle
  updateTranslations: (code, translations) => 
    api.put(`/languages/${code}/translations`, { translations }),
    
  // Dil durumunu güncelle (aktif/pasif)
  updateStatus: (code, isActive) => 
    api.patch(`/languages/${code}/status`, { isActive }),
};

// Auth API'leri
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh-token'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => 
    api.post('/auth/reset-password', { token, password }),
};

// Kullanıcı API'leri
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.post('/users/change-password', data),
  getPreferences: () => api.get('/users/preferences'),
  updatePreferences: (data) => api.put('/users/preferences', data),
};

export default api;
