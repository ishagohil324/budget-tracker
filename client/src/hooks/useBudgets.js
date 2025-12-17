import { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';

export const useBudgets = () => {
  const context = useContext(BudgetContext);
  
  if (!context) {
    throw new Error('useBudgets must be used within BudgetProvider');
  }
  
  return context;
};