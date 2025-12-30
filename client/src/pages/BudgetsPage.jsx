import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Target, Download } from 'lucide-react'; // Added Download
import { useBudgets } from '../hooks/useBudgets';
import { useAuth } from '../hooks/useAuth'; // ADD THIS
import GlassCard from '../components/common/GlassCard';
import Button3D from '../components/common/Button3D';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import { formatCurrency } from '../utils/formatters';
import { BUDGET_PERIODS, ALERT_THRESHOLDS } from '../utils/constants';
import { exportBudgetsToPDF } from '../utils/exportUtils'; 
// import { Download } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import { exportBudgetsToPDF } from '../utils/exportUtils';

const BudgetsPage = () => {
  const { budgets, loading, createBudget, updateBudget, deleteBudget } = useBudgets();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [alert, setAlert] = useState(null);
  


  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    period: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    alertThreshold: 80,
  });

  const handleOpenModal = (budget = null) => {
    if (budget) {
      setEditingBudget(budget);
      setFormData({
        category: budget.category,
        limit: budget.limit,
        period: budget.period,
        startDate: new Date(budget.startDate).toISOString().split('T')[0],
        endDate: new Date(budget.endDate).toISOString().split('T')[0],
        alertThreshold: budget.alertThreshold,
      });
    } else {
      setEditingBudget(null);
      setFormData({
        category: '',
        limit: '',
        period: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
        alertThreshold: 80,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editingBudget
      ? await updateBudget(editingBudget._id, formData)
      : await createBudget(formData);

    if (result.success) {
      setAlert({ type: 'success', message: `Budget ${editingBudget ? 'updated' : 'created'} successfully!` });
      handleCloseModal();
    } else {
      setAlert({ type: 'error', message: result.message });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      const result = await deleteBudget(id);
      if (result.success) {
        setAlert({ type: 'success', message: 'Budget deleted successfully!' });
      } else {
        setAlert({ type: 'error', message: result.message });
      }
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

     {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <div>
    <h1 className="text-4xl font-bold text-white mb-2">Budgets 🎯</h1>
    <p className="text-gray-300">Set spending limits for your categories</p>
  </div>
  
  <div className="flex gap-3">
    <Button3D icon={Plus} onClick={() => handleOpenModal()}>
      Add Budget
    </Button3D>
    
    <Button3D
      icon={Download}
      variant="secondary"
      onClick={() => exportBudgetsToPDF(budgets || [], user?.name || 'User')}
    >
      Export PDF
    </Button3D>
  </div>
</div>

      {/* Budgets Grid */}
      {budgets.length === 0 ? (
        <GlassCard>
          <div className="text-center py-12">
            <Target size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No budgets yet. Create one to get started!</p>
          </div>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, index) => {
            const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
            const isOverBudget = percentage >= 100;
            const isNearLimit = percentage >= budget.alertThreshold;

            return (
              <motion.div
                key={budget._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className={`${isOverBudget ? 'border-2 border-red-500' : isNearLimit ? 'border-2 border-yellow-500' : ''}`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{budget.category}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(budget)}
                        className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(budget._id)}
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
                      <span className="text-gray-400">
                        of {formatCurrency(budget.limit)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white bg-opacity-10 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(percentage)} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Percentage */}
                    <p className={`text-right mt-2 font-semibold ${
                      isOverBudget ? 'text-red-400' : isNearLimit ? 'text-yellow-400' : 'text-green-400'
                    }`}>
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
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBudget ? 'Edit Budget' : 'Add Budget'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Food, Transport"
            />
          </div>

          {/* Limit */}
          <div>
            <label className="block text-white font-medium mb-2">Budget Limit</label>
            <input
              type="number"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          {/* Period */}
          <div>
            <label className="block text-white font-medium mb-2">Period</label>
            <select
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BUDGET_PERIODS.map((period) => (
                <option key={period.value} value={period.value} className="bg-gray-800">
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Alert Threshold */}
          <div>
            <label className="block text-white font-medium mb-2">
              Alert Threshold ({formData.alertThreshold}%)
            </label>
            <input
              type="range"
              value={formData.alertThreshold}
              onChange={(e) => setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })}
              min="50"
              max="100"
              step="5"
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button3D type="submit" variant="success" fullWidth>
              {editingBudget ? 'Update' : 'Create'}
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

export default BudgetsPage;