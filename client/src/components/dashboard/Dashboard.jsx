import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { useBudgets } from '../../hooks/useBudgets';
import StatsCard from './StatsCard';
import BalanceCard3D from './BalanceCard3D';
import RecentTransactions from './RecentTransactions';
import QuickActions from './QuickActions';
import { formatCurrency } from '../../utils/formatters';
import Loading from '../common/Loading';

const Dashboard = () => {
  const { stats, transactions, loading: transLoading } = useTransactions();
  const { alerts, loading: budgetLoading } = useBudgets();

  if (transLoading || budgetLoading) {
    return <Loading fullScreen />;
  }

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

      {/* Balance Card 3D */}
      <BalanceCard3D balance={stats?.balance || 0} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={TrendingUp}
          label="Total Income"
          value={formatCurrency(stats?.totalIncome || 0)}
          color="#10B981"
          delay={0.1}
        />
        <StatsCard
          icon={TrendingDown}
          label="Total Expense"
          value={formatCurrency(stats?.totalExpense || 0)}
          color="#EF4444"
          delay={0.2}
        />
        <StatsCard
          icon={Wallet}
          label="Transactions"
          value={transactions.length}
          color="#3B82F6"
          delay={0.3}
        />
      </div>

      {/* Budget Alerts */}
      {alerts && alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6 border-2 border-yellow-500"
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4">⚠️ Budget Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className="p-3 bg-yellow-500 bg-opacity-10 rounded-lg"
              >
                <p className="text-white font-medium">
                  {alert.category}: {formatCurrency(alert.spent)} / {formatCurrency(alert.limit)}
                </p>
                <p className="text-yellow-300 text-sm">
                  {Math.round((alert.spent / alert.limit) * 100)}% of budget used
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;