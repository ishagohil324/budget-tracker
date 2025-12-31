import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GlassCard from '../common/GlassCard';
import { formatCurrency } from '../../utils/formatters';

const LineChart3D = ({ transactions }) => {
  const getMonthlyData = () => {
    const monthlyData = {};
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      last6Months.push(monthKey);
      monthlyData[monthKey] = {
        month: date.toLocaleString('default', { month: 'short' }),
        income: 0,
        expense: 0,
      };
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

  return (
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
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </GlassCard>
  );
};

export default LineChart3D;