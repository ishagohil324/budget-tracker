import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useTransactions } from '../hooks/useTransactions';
import GlassCard from '../components/common/GlassCard';
import Loading from '../components/common/Loading';
import { formatCurrency } from '../utils/formatters';
import { CHART_COLORS } from '../utils/constants';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import RadarSpending from '../components/analytics/RadarSpending';
import SpendingHeatmap from '../components/analytics/SpendingHeatmap';



const AnalyticsPage = () => {
  const { stats, transactions, loading } = useTransactions();

  if (loading) return <Loading fullScreen />;

  // Prepare chart data
  const categoryData = stats?.categoryExpenses?.map((item, index) => ({
    name: item._id,
    value: item.total,
    color: CHART_COLORS[index % CHART_COLORS.length],
  })) || [];

  const topCategories = categoryData.slice(0, 5);
  const heatmapData = [];

monthlyTrendData.forEach(month => {
  stats?.categoryExpenses?.forEach(cat => {
    heatmapData.push({
      category: cat._id,
      month: month.month,
      value: Math.floor(Math.random() * cat.total), // replace later with real month-category logic
    });
  });
});


  // Monthly trend data

const getMonthlyData = () => {
  const monthlyData = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    monthlyData.push({
      key: `${d.getFullYear()}-${d.getMonth()}`, // UNIQUE
      month: d.toLocaleString('default', {
        month: 'short',
        year: '2-digit', // 👈 THIS FIXES DUPLICATES
      }),
      income: 0,
      expense: 0,
    });
  }

  transactions.forEach((t) => {
    const td = new Date(t.date);
    const key = `${td.getFullYear()}-${td.getMonth()}`;

    const entry = monthlyData.find((m) => m.key === key);
    if (!entry) return;

    if (t.type === 'income') entry.income += t.amount;
    else entry.expense += t.amount;
  });

  return monthlyData;
};


const monthlyTrendData = getMonthlyData();

  // Spending insights
  const getWeeklyAverage = () => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    return Math.round(total / 4);
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
              {formatCurrency(
                transactions.filter((t) => t.type === 'expense').length > 0
                  ? Math.round(
                      stats?.totalExpense /
                        transactions.filter((t) => t.type === 'expense').length
                    )
                  : 0
              )}
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

      {/* Charts Row 1 - Pie & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
{/* Pie Chart */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4 }}
>
  <GlassCard>
    <h2 className="text-2xl font-bold text-white mb-6">
      Expense by Category
    </h2>
    {categoryData.length === 0 ? (
      <p className="text-gray-300 text-center py-12">No expense data yet</p>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
<Tooltip
  formatter={(value, name) => [
    <span style={{ color: '#000', fontWeight: 600 }}>
      {formatCurrency(value)}
    </span>,
    <span style={{ color: '#000' }}>{name}</span>,
  ]}
  contentStyle={{
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
  }}
  labelStyle={{ color: '#000', fontWeight: 'bold' }}
/>

          <Legend 
            formatter={(value, entry) => (
              <span style={{ color: '#fff' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </GlassCard>
</motion.div>

        {/* Bar Chart */}
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
  formatter={(value) => (
    <span style={{ color: '#141313ff', fontWeight: 600 }}>
      {formatCurrency(value)}
    </span>
  )}
  contentStyle={{
    backgroundColor: 'rgba(250, 243, 243, 0.85)',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  }}
  labelStyle={{ color: '#111111ff', fontWeight: 'bold' }}
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
     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} > <GlassCard> <h2 className="text-2xl font-bold text-white mb-6">6-Month Trend</h2> {monthlyTrendData.every((d) => d.income === 0 && d.expense === 0) ? ( <p className="text-gray-300 text-center py-12"> No transaction history yet </p> ) : ( <ResponsiveContainer width="100%" height={300}> <LineChart data={monthlyTrendData}> <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /> <XAxis dataKey="month" stroke="#fff" /> <YAxis stroke="#fff" /> <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: 'rgba(248, 242, 242, 0.8)', border: 'none', borderRadius: '8px', }} /> <Legend /> <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Income" /> <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} name="Expense" /> </LineChart> </ResponsiveContainer> )} </GlassCard> </motion.div>
      {/* Spending Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-6">Spending Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <DollarSign
                size={48}
                className="mx-auto mb-3 text-blue-400"
              />
              <p className="text-gray-400 text-sm mb-1">Weekly Average</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(getWeeklyAverage())}
              </p>
            </div>
            <div className="text-center">
              <TrendingUp
                size={48}
                className="mx-auto mb-3 text-red-400"
              />
              <p className="text-gray-400 text-sm mb-1">Largest Expense</p>
              <p className="text-2xl font-bold text-white">
                {getLargestExpense()
                  ? formatCurrency(getLargestExpense().amount)
                  : 'N/A'}
              </p>
            </div>
            <div className="text-center">
              <TrendingDown
                size={48}
                className="mx-auto mb-3 text-purple-400"
              />
              <p className="text-gray-400 text-sm mb-1">Most Frequent</p>
              <p className="text-2xl font-bold text-white">
                {getMostFrequentCategory()}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <GlassCard>
  <h2 className="text-2xl font-bold text-white mb-6">
    Spending Radar 🕸️
  </h2>
  <RadarSpending data={topCategories} />
</GlassCard>

<GlassCard>
  <h2 className="text-2xl font-bold text-white mb-6">
    Spending Heatmap 🔥
  </h2>
  <SpendingHeatmap data={heatmapData} />
</GlassCard>


    </div>
  );
};

export default AnalyticsPage;