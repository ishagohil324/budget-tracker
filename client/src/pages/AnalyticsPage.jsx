import React from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '../hooks/useTransactions';
import Analytics from '../components/analytics/Analytics';
import Loading from '../components/common/Loading';

const AnalyticsPage = () => {
  const { stats, transactions, loading } = useTransactions();

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Analytics 📊</h1>
        <p className="text-gray-300">Visualize your spending patterns</p>
      </motion.div>

      <Analytics stats={stats} transactions={transactions} />
    </div>
  );
};

export default AnalyticsPage;