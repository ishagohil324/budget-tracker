import axios from './axios';

// Auth APIs
export const authAPI = {
  register: (data) => axios.post('/auth/register', data),
  login: (data) => axios.post('/auth/login', data),
  getCurrentUser: () => axios.get('/auth/me'),
};

// Transaction APIs
export const transactionAPI = {
  getAll: () => axios.get('/transactions'),
  getById: (id) => axios.get(`/transactions/${id}`),
  create: (data) => axios.post('/transactions', data),
  update: (id, data) => axios.put(`/transactions/${id}`, data),
  delete: (id) => axios.delete(`/transactions/${id}`),
  getStats: () => axios.get('/transactions/stats'),
  getByDateRange: (startDate, endDate) => 
    axios.get(`/transactions/daterange?startDate=${startDate}&endDate=${endDate}`),
};

// Budget APIs
export const budgetAPI = {
  getAll: () => axios.get('/budgets'),
  getById: (id) => axios.get(`/budgets/${id}`),
  create: (data) => axios.post('/budgets', data),
  update: (id, data) => axios.put(`/budgets/${id}`, data),
  delete: (id) => axios.delete(`/budgets/${id}`),
  getAlerts: () => axios.get('/budgets/alerts'),
};

// Category APIs
export const categoryAPI = {
  getAll: () => axios.get('/categories'),
  getById: (id) => axios.get(`/categories/${id}`),
  getByType: (type) => axios.get(`/categories/type/${type}`),
  create: (data) => axios.post('/categories', data),
  update: (id, data) => axios.put(`/categories/${id}`, data),
  delete: (id) => axios.delete(`/categories/${id}`),
};