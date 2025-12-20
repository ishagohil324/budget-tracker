import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../common/GlassCard';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Receipt } from 'lucide-react';

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Receipt size={24} />
          Recent Transactions
        </h3>
        <button
          onClick={() => navigate('/transactions')}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          View All →
        </button>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-300 text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction, index) => (
            <motion.div
              key={transaction._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all cursor-pointer"
              onClick={() => navigate('/transactions')}
            >
              <div>
                <p className="text-white font-medium">{transaction.category}</p>
                <p className="text-gray-400 text-sm">{formatDate(transaction.date)}</p>
              </div>
              <p
                className={`text-xl font-bold ${
                  transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default RecentTransactions;