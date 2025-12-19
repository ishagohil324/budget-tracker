import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { useBudgets } from '../hooks/useBudgets';
import GlassCard from '../components/common/GlassCard';
import Loading from '../components/common/Loading';
import { formatCurrency, formatDate } from '../utils/formatters';

const DashboardPage = () => {
  const { stats, transactions, loading: transLoading } = useTransactions();
  const { alerts, loading: budgetLoading } = useBudgets();

  if (transLoading || budgetLoading) {
    return <Loading fullScreen />;
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard 📊</h1>
        <p className="text-gray-300">Welcome back! Here's your financial overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Income */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Total Income</p>
                <h3 className="text-3xl font-bold text-green-400">
                  {formatCurrency(stats?.totalIncome || 0)}
                </h3>
              </div>
              <TrendingUp size={48} className="text-green-400" />
            </div>
          </GlassCard>
        </motion.div>

        {/* Total Expense */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Total Expense</p>
                <h3 className="text-3xl font-bold text-red-400">
                  {formatCurrency(stats?.totalExpense || 0)}
                </h3>
              </div>
              <TrendingDown size={48} className="text-red-400" />
            </div>
          </GlassCard>
        </motion.div>

        {/* Balance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Balance</p>
                <h3 className="text-3xl font-bold text-blue-400">
                  {formatCurrency(stats?.balance || 0)}
                </h3>
              </div>
              <Wallet size={48} className="text-blue-400" />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Budget Alerts */}
      {alerts && alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Budget Alerts</h2>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="p-3 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500"
                >
                  <p className="text-white font-medium">
                    {alert.category}: {formatCurrency(alert.spent)} / {formatCurrency(alert.limit)}
                  </p>
                  <p className="text-yellow-200 text-sm">
                    {Math.round((alert.spent / alert.limit) * 100)}% of budget used
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-4">Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-300 text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all"
                >
                  <div>
                    <p className="text-white font-medium">{transaction.category}</p>
                    <p className="text-gray-400 text-sm">{formatDate(transaction.date)}</p>
                  </div>
                  <p
                    className={`text-xl font-bold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default DashboardPage;