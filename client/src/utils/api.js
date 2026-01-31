// import api from './axios';
// import axios from './axios';

// // Auth APIs
// export const authAPI = {
//   register: (data) => api.post('/auth/register', data),
//   login: (data) => api.post('/auth/login', data),
//   getCurrentUser: () => axios.get('/auth/me'),
// };

// // Transaction APIs
// export const transactionAPI = {
//   getAll: () => axios.get('/transactions'),
//   getById: (id) => axios.get(`/transactions/${id}`),
//   create: (data) => api.post('/transactions', data),
//   update: (id, data) => axios.put(`/transactions/${id}`, data),
//   delete: (id) => axios.delete(`/transactions/${id}`),
//   getStats: () => axios.get('/transactions/stats'),
//   getByDateRange: (startDate, endDate) => 
//     axios.get(`/transactions/daterange?startDate=${startDate}&endDate=${endDate}`),
// };

// // Budget APIs
// export const budgetAPI = {
//   getAll: () => axios.get('/budgets'),
//   getById: (id) => axios.get(`/budgets/${id}`),
//   create: (data) => api.post('/budgets', data),
//   update: (id, data) => axios.put(`/budgets/${id}`, data),
//   delete: (id) => axios.delete(`/budgets/${id}`),
//   getAlerts: () => axios.get('/budgets/alerts'),
// };

// // Category APIs
// export const categoryAPI = {
//   getAll: () => axios.get('/categories'),
//   getById: (id) => axios.get(`/categories/${id}`),
//   getByType: (type) => axios.get(`/categories/type/${type}`),
//   create: (data) => api.post('/categories', data),
//   update: (id, data) => axios.put(`/categories/${id}`, data),
//   delete: (id) => axios.delete(`/categories/${id}`),
// };

import api from './axios';

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Transaction APIs
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post('/transactions', data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  getStats: () => api.get('/transactions/stats'),
  getByDateRange: (startDate, endDate) =>
    api.get(`/transactions/daterange?startDate=${startDate}&endDate=${endDate}`),
};

// Budget APIs
export const budgetAPI = {
  getAll: () => api.get('/budgets'),
  getById: (id) => api.get(`/budgets/${id}`),
  create: (data) => api.post('/budgets', data),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`),
  getAlerts: () => api.get('/budgets/alerts'),
};

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  getByType: (type) => api.get(`/categories/type/${type}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`),
  delete: (id) => api.delete(`/categories/${id}`),
};
