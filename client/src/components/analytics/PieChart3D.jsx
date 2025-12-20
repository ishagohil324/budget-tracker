import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import GlassCard from '../common/GlassCard';
import { CHART_COLORS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

const PieChart3D = ({ data }) => {
  const chartData = data.slice(0, 6).map((item, index) => ({
    name: item._id,
    value: item.total,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold text-white mb-6">Expense by Category</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-300 text-center py-12">No expense data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </GlassCard>
  );
};

export default PieChart3D;