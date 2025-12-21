import React from 'react';
import { motion } from 'framer-motion';
import PieChart3D from './PieChart3D';
import LineChart3D from './LineChart3D';
import BarChart3D from './BarChart3D';
import SpendingTrends from './SpendingTrends';
import GlassCard from '../common/GlassCard';

const Analytics = ({ stats, transactions }) => {
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <h3 className="text-gray-300 text-sm mb-2">Savings Rate</h3>
            <p className="text-3xl font-bold text-blue-400">
              {stats?.totalIncome > 0
                ? `${((stats.balance / stats.totalIncome) * 100).toFixed(1)}%`
                : '0%'}
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <h3 className="text-gray-300 text-sm mb-2">Avg. Transaction</h3>
            <p className="text-3xl font-bold text-purple-400">
              ₹{transactions.length > 0
                ? Math.round(stats?.totalExpense / transactions.filter(t => t.type === 'expense').length || 0)
                : 0}
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard>
            <h3 className="text-gray-300 text-sm mb-2">Top Category</h3>
            <p className="text-3xl font-bold text-green-400">
              {stats?.categoryExpenses?.[0]?._id || 'N/A'}
            </p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart3D data={stats?.categoryExpenses || []} />
        <BarChart3D data={stats?.categoryExpenses || []} />
      </div>

      <LineChart3D transactions={transactions} />
      {/* <BarChart3D data={stats?.monthlyExpenses || []} /> */}
      <SpendingTrends transactions={transactions} />
    </div>
  );
};

export default Analytics;