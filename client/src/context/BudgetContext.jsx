import React, { createContext, useState, useEffect, useContext } from 'react';
import { budgetAPI } from '../utils/api';
import { AuthContext } from './AuthContext';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load budgets
  useEffect(() => {
    if (isAuthenticated) {
      fetchBudgets();
      fetchAlerts();
    }
  }, [isAuthenticated]);

  // Fetch all budgets
  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await budgetAPI.getAll();
      setBudgets(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  // Fetch budget alerts
  const fetchAlerts = async () => {
    try {
      const response = await budgetAPI.getAlerts();
      setAlerts(response.data);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    }
  };

  // Create budget
  const createBudget = async (data) => {
    try {
      const response = await budgetAPI.create(data);
      setBudgets([...budgets, response.data]);
      await fetchAlerts(); // Refresh alerts
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to create budget',
      };
    }
  };

  // Update budget
  const updateBudget = async (id, data) => {
    try {
      const response = await budgetAPI.update(id, data);
      setBudgets(budgets.map((b) => (b._id === id ? response.data : b)));
      await fetchAlerts(); // Refresh alerts
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update budget',
      };
    }
  };

  // Delete budget
  const deleteBudget = async (id) => {
    try {
      await budgetAPI.delete(id);
      setBudgets(budgets.filter((b) => b._id !== id));
      await fetchAlerts(); // Refresh alerts
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to delete budget',
      };
    }
  };

  const value = {
    budgets,
    alerts,
    loading,
    error,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    fetchAlerts,
  };

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};