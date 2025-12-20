import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              transaction.type === 'income'
                ? 'bg-green-500 bg-opacity-20 text-green-300'
                : 'bg-red-500 bg-opacity-20 text-red-300'
            }`}
          >
            {transaction.type.toUpperCase()}
          </span>
          <h3 className="text-white font-medium">{transaction.category}</h3>
        </div>
        <p className="text-gray-400 text-sm">{transaction.description}</p>
        <p className="text-gray-500 text-xs mt-1">
          {formatDate(transaction.date)} • {transaction.paymentMethod}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p
          className={`text-2xl font-bold ${
            transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {transaction.type === 'income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(transaction._id)}
            className="p-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;