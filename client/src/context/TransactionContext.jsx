import React, { createContext, useState, useEffect, useContext } from 'react';
import { transactionAPI } from '../utils/api';
import { AuthContext } from './AuthContext';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load transactions
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
      fetchStats();
    }
  }, [isAuthenticated]);

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transaction stats
  const fetchStats = async () => {
    try {
      const response = await transactionAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Create transaction
  const createTransaction = async (data) => {
    try {
      const response = await transactionAPI.create(data);
      setTransactions([response.data, ...transactions]);
      await fetchStats(); // Refresh stats
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to create transaction',
      };
    }
  };

  // Update transaction
  const updateTransaction = async (id, data) => {
    try {
      const response = await transactionAPI.update(id, data);
      setTransactions(
        transactions.map((t) => (t._id === id ? response.data : t))
      );
      await fetchStats(); // Refresh stats
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update transaction',
      };
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      setTransactions(transactions.filter((t) => t._id !== id));
      await fetchStats(); // Refresh stats
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to delete transaction',
      };
    }
  };

  // Get transactions by date range
  const getTransactionsByDateRange = async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await transactionAPI.getByDateRange(startDate, endDate);
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    transactions,
    stats,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByDateRange,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};