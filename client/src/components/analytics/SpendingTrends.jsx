import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const SpendingTrends = ({ transactions }) => {
  const getWeeklyAverage = () => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    return Math.round(total / 4); // Approximate weekly
  };

  const getLargestExpense = () => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    if (expenses.length === 0) return null;
    return expenses.reduce((max, t) => (t.amount > max.amount ? t : max));
  };

  const getMostFrequentCategory = () => {
    const categoryCount = {};
    transactions.forEach((t) => {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    });
    const sorted = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : 'N/A';
  };

  const trends = [
    {
      icon: DollarSign,
      label: 'Weekly Average',
      value: `₹${getWeeklyAverage()}`,
      color: '#3B82F6',
    },
    {
      icon: TrendingUp,
      label: 'Largest Expense',
      value: getLargestExpense() ? `₹${getLargestExpense().amount}` : 'N/A',
      color: '#EF4444',
    },
    {
      icon: TrendingDown,
      label: 'Most Frequent',
      value: getMostFrequentCategory(),
      color: '#8B5CF6',
    },
  ];

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold text-white mb-6">Spending Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((trend, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <trend.icon size={48} className="mx-auto mb-3" style={{ color: trend.color }} />
            <p className="text-gray-400 text-sm mb-1">{trend.label}</p>
            <p className="text-2xl font-bold text-white">{trend.value}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default SpendingTrends;