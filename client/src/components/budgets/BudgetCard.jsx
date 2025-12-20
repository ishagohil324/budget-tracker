import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import BudgetProgress from './BudgetProgress';
import GlassCard from '../common/GlassCard';
import { formatCurrency } from '../../utils/formatters';

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
  const isOverBudget = percentage >= 100;
  const isNearLimit = percentage >= budget.alertThreshold;

  return (
    <GlassCard
      className={`${
        isOverBudget
          ? 'border-2 border-red-500'
          : isNearLimit
          ? 'border-2 border-yellow-500'
          : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{budget.category}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(budget)}
            className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(budget._id)}
            className="p-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-2xl font-bold text-white">
            {formatCurrency(budget.spent)}
          </span>
          <span className="text-gray-400">of {formatCurrency(budget.limit)}</span>
        </div>

        {/* Progress Bar */}
        <BudgetProgress percentage={percentage} />

        {/* Percentage */}
        <p
          className={`text-right mt-2 font-semibold ${
            isOverBudget
              ? 'text-red-400'
              : isNearLimit
              ? 'text-yellow-400'
              : 'text-green-400'
          }`}
        >
          {percentage.toFixed(1)}%
        </p>
      </div>

      {/* Period */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span className="capitalize">{budget.period}</span>
        <span>Alert at {budget.alertThreshold}%</span>
      </div>

      {/* Warning Messages */}
      {isOverBudget && (
        <div className="mt-3 p-2 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
          <p className="text-red-300 text-sm font-medium">⚠️ Budget exceeded!</p>
        </div>
      )}
      {!isOverBudget && isNearLimit && (
        <div className="mt-3 p-2 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded-lg">
          <p className="text-yellow-300 text-sm font-medium">⚠️ Approaching limit</p>
        </div>
      )}
    </GlassCard>
  );
};

export default BudgetCard;