import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../hooks/useTransactions';
import GlassCard from '../components/common/GlassCard';
import Loading from '../components/common/Loading';
import { formatCurrency } from '../utils/formatters';
import { CHART_COLORS } from '../utils/constants';

const AnalyticsPage = () => {
  const { stats, transactions, loading } = useTransactions();

  if (loading) return <Loading fullScreen />;

  // Prepare data for charts
  const categoryData = stats?.categoryExpenses?.map((item, index) => ({
    name: item._id,
    value: item.total,
    color: CHART_COLORS[index % CHART_COLORS.length],
  })) || [];

  // Monthly trend data (last 6 months)
  const getMonthlyData = () => {
    const monthlyData = {};
    const last6Months = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      last6Months.push(monthKey);
      monthlyData[monthKey] = { month: date.toLocaleString('default', { month: 'short' }), income: 0, expense: 0 };
    }

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyData[monthKey]) {
        if (t.type === 'income') {
          monthlyData[monthKey].income += t.amount;
        } else {
          monthlyData[monthKey].expense += t.amount;
        }
      }
    });

    return last6Months.map((key) => monthlyData[key]);
  };

  const monthlyTrendData = getMonthlyData();

  // Top spending categories (top 5)
  const topCategories = categoryData.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Analytics 📊</h1>
        <p className="text-gray-300">Visualize your spending patterns</p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <h3 className="text-gray-300 text-sm mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-400">
              {formatCurrency(stats?.totalIncome || 0)}
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <h3 className="text-gray-300 text-sm mb-2">Total Expense</h3>
            <p className="text-3xl font-bold text-red-400">
              {formatCurrency(stats?.totalExpense || 0)}
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
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
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-bold text-white mb-6">Expense by Category</h2>
            {categoryData.length === 0 ? (
              <p className="text-gray-300 text-center py-12">No expense data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </GlassCard>
        </motion.div>

        {/* Bar Chart - Top Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-bold text-white mb-6">Top 5 Categories</h2>
            {topCategories.length === 0 ? (
              <p className="text-gray-300 text-center py-12">No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Line Chart - Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-6">6-Month Trend</h2>
          {monthlyTrendData.every((d) => d.income === 0 && d.expense === 0) ? (
            <p className="text-gray-300 text-center py-12">No transaction history yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} name="Expense" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;