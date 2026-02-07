import axios from './axios';

// Auth APIs
export const authAPI = {
  register: (data) => axios.post('/api/auth/register', data),
  login: (data) => axios.post('/api/auth/login', data),
  getCurrentUser: () => axios.get('/api/auth/me'),
};

// Transaction APIs
export const transactionAPI = {
  getAll: () => axios.get('/api/transactions'),
  getById: (id) => axios.get(`/api/transactions/${id}`),
  create: (data) => axios.post('/api/transactions', data),
  update: (id, data) => axios.put(`/api/transactions/${id}`, data),
  delete: (id) => axios.delete(`/api/transactions/${id}`),
  getStats: () => axios.get('/api/transactions/stats'),
  getByDateRange: (startDate, endDate) => 
    axios.get(`/api/transactions/daterange?startDate=${startDate}&endDate=${endDate}`),
};

// Budget APIs
export const budgetAPI = {
  getAll: () => axios.get('/api/budgets'),
  getById: (id) => axios.get(`/api/budgets/${id}`),
  create: (data) => axios.post('/api/budgets', data),
  update: (id, data) => axios.put(`/api/budgets/${id}`, data),
  delete: (id) => axios.delete(`/api/budgets/${id}`),
  getAlerts: () => axios.get('/api/budgets/alerts'),
};

// Category APIs
export const categoryAPI = {
  getAll: () => axios.get('/api/categories'),
  getById: (id) => axios.get(`/api/categories/${id}`),
  getByType: (type) => axios.get(`/api/categories/type/${type}`),
  create: (data) => axios.post('/api/categories', data),
  update: (id, data) => axios.put(`/api/categories/${id}`, data),
  delete: (id) => axios.delete(`/api/categories/${id}`),
};

// Goal APIs ✅ ADDED
export const goalAPI = {
  getAll: () => axios.get('/api/goals'),
  getById: (id) => axios.get(`/api/goals/${id}`),
  create: (data) => axios.post('/api/goals', data),
  update: (id, data) => axios.put(`/api/goals/${id}`, data),
  delete: (id) => axios.delete(`/api/goals/${id}`),
};// import api from './axios';

// // Auth APIs
// export const authAPI = {
//   register: (data) => axios.post('/auth/register', data),
//   login: (data) => axios.post('/auth/login', data),
//   getCurrentUser: () => api.get('/auth/me'),
// };

// // Transaction APIs
// export const transactionAPI = {
//   getAll: () => api.get('/transactions'),
//   getById: (id) => api.get(`/transactions/${id}`),
//   create: (data) => axios.post('/transactions', data),
//   update: (id, data) => api.put(`/transactions/${id}`, data),
//   delete: (id) => api.delete(`/transactions/${id}`),
//   getStats: () => api.get('/transactions/stats'),
//   getByDateRange: (startDate, endDate) =>
//     api.get(`/transactions/daterange?startDate=${startDate}&endDate=${endDate}`),
// };

// // Budget APIs
// export const budgetAPI = {
//   getAll: () => api.get('/budgets'),
//   getById: (id) => api.get(`/budgets/${id}`),
//   create: (data) => axios.post('/budgets', data),
//   update: (id, data) => api.put(`/budgets/${id}`, data),
//   delete: (id) => api.delete(`/budgets/${id}`),
//   getAlerts: () => api.get('/budgets/alerts'),
// };

// // Category APIs
// export const categoryAPI = {
//   getAll: () => api.get('/categories'),
//   getById: (id) => api.get(`/categories/${id}`),
//   getByType: (type) => api.get(`/categories/type/${type}`),
//   create: (data) => axios.post('/categories', data),
//   update: (id, data) => api.put(`/categories/${id}`),
//   delete: (id) => api.delete(`/categories/${id}`),
// };
// // 