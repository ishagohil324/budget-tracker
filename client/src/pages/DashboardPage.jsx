import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, AlertCircle, Download } from 'lucide-react'; // Added Download
import { useTransactions } from '../hooks/useTransactions';
import { useBudgets } from '../hooks/useBudgets';
import { useAuth } from '../hooks/useAuth'; // ADD THIS
import StatsCard from '../components/dashboard/StatsCard';
import BalanceCard3D from '../components/dashboard/BalanceCard3D';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import QuickActions from '../components/dashboard/QuickActions';
import Loading from '../components/common/Loading';
import GlassCard from '../components/common/GlassCard';
import Button3D from '../components/common/Button3D'; // ADD THIS
import { formatCurrency } from '../utils/formatters';
import { exportMonthlyReport } from '../utils/exportUtils'; // ADD THIS
import AIInsights from '../components/dashboard/AIInsights';
// import { Download } from 'lucide-react';
// import Button3D from '../components/common/Button3D';
// import { exportMonthlyReport } from '../utils/exportUtils';
// import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { stats, transactions, loading: transLoading } = useTransactions();
  const { alerts, budgets, loading: budgetLoading } = useBudgets();

  // const { alerts, loading: budgetLoading } = useBudgets();
   const { user } = useAuth();
  //  const { budgets } = useBudgets();

 

  if (transLoading || budgetLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
     {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h1 className="text-4xl font-bold text-white mb-2">Dashboard 📊</h1>
    <p className="text-gray-300">Welcome back! Here's your financial overview</p>
  </motion.div>

  {/* Export Button */}
  <Button3D
    icon={Download}
    variant="success"
    onClick={() => {
      const goalsData = []; // Empty for now, we'll fetch later
      exportMonthlyReport(
  transactions || [],
  budgets || [],
  goalsData || [],
  stats,
  user?.name
);


    }}
  >
    Monthly Report
  </Button3D>
</div>

      {/* 3D Balance Card */}
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
          value={transactions?.length || 0}
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
        >
          <GlassCard className="border-2 border-yellow-500">
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

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={transactions || []} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* AI Insights */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
>
  <AIInsights transactions={transactions || []} budgets={budgets || []} stats={stats} />
</motion.div>
    </div>
  );
};

export default DashboardPage;