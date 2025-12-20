import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Wallet, TrendingUp, Tag } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Plus,
      label: 'Add Transaction',
      color: '#3B82F6',
      path: '/transactions',
    },
    {
      icon: Wallet,
      label: 'Set Budget',
      color: '#8B5CF6',
      path: '/budgets',
    },
    {
      icon: TrendingUp,
      label: 'View Analytics',
      color: '#10B981',
      path: '/analytics',
    },
    {
      icon: Tag,
      label: 'Manage Categories',
      color: '#F59E0B',
      path: '/categories',
    },
  ];

  return (
    <GlassCard>
      <h3 className="text-2xl font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className="p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all text-center"
            style={{ borderLeft: `4px solid ${action.color}` }}
          >
            <action.icon
              size={32}
              className="mx-auto mb-2"
              style={{ color: action.color }}
            />
            <p className="text-white font-medium text-sm">{action.label}</p>
          </motion.button>
        ))}
      </div>
    </GlassCard>
  );
};

export default QuickActions;