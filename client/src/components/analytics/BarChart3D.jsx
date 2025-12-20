import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import GlassCard from '../common/GlassCard';
import { CHART_COLORS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

const BarChart3D = ({ data }) => {
  const chartData = data.slice(0, 5).map((item, index) => ({
    name: item._id,
    value: item.total,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold text-white mb-6">Top 5 Categories</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-300 text-center py-12">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </GlassCard>
  );
};

export default BarChart3D;