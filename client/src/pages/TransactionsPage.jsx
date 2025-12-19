import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import GlassCard from '../components/common/GlassCard';
import Button3D from '../components/common/Button3D';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import { formatCurrency, formatDate } from '../utils/formatters';
import { TRANSACTION_TYPES, PAYMENT_METHODS } from '../utils/constants';

const TransactionsPage = () => {
  const { transactions, loading, createTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash',
  });

  const handleOpenModal = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description || '',
        date: new Date(transaction.date).toISOString().split('T')[0],
        paymentMethod: transaction.paymentMethod,
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'cash',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editingTransaction
      ? await updateTransaction(editingTransaction._id, formData)
      : await createTransaction(formData);

    if (result.success) {
      setAlert({ type: 'success', message: `Transaction ${editingTransaction ? 'updated' : 'created'} successfully!` });
      handleCloseModal();
    } else {
      setAlert({ type: 'error', message: result.message });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const result = await deleteTransaction(id);
      if (result.success) {
        setAlert({ type: 'success', message: 'Transaction deleted successfully!' });
      } else {
        setAlert({ type: 'error', message: result.message });
      }
    }
  };

  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Transactions 💳</h1>
          <p className="text-gray-300">Manage your income and expenses</p>
        </div>
        <Button3D icon={Plus} onClick={() => handleOpenModal()}>
          Add Transaction
        </Button3D>
      </div>

      {/* Search */}
      <GlassCard>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </GlassCard>

      {/* Transactions List */}
      <GlassCard>
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-300 text-center py-12">No transactions found</p>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'income' 
                        ? 'bg-green-500 bg-opacity-20 text-green-300' 
                        : 'bg-red-500 bg-opacity-20 text-red-300'
                    }`}>
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
                  <p className={`text-2xl font-bold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(transaction)}
                      className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="p-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-white font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="income" className="bg-gray-800">Income</option>
              <option value="expense" className="bg-gray-800">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Food, Salary"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-white font-medium mb-2">Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add notes..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-white font-medium mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-white font-medium mb-2">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method.value} value={method.value} className="bg-gray-800">
                  {method.icon} {method.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button3D type="submit" variant="success" fullWidth>
              {editingTransaction ? 'Update' : 'Create'}
            </Button3D>
            <Button3D type="button" variant="secondary" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button3D>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TransactionsPage;