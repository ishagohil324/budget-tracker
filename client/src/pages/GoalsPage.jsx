import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, Calendar, TrendingUp, Check, Edit, Trash2 } from 'lucide-react';
import axios from '../utils/axios';
import GlassCard from '../components/common/GlassCard';
import Button3D from '../components/common/Button3D';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Download } from 'lucide-react';
import { exportGoalsToPDF } from '../utils/exportUtils';
import { useAuth } from '../hooks/useAuth';
// import { useAuth } from '../hooks/useAuth'; // ADD THIS


const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [alert, setAlert] = useState(null);
  const [addMoneyModal, setAddMoneyModal] = useState(null);
  const [addAmount, setAddAmount] = useState('');
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    category: 'savings',
    icon: '🎯',
    color: '#10B981',
  });

  const categories = [
    { value: 'savings', label: 'Savings', icon: '💰' },
    { value: 'purchase', label: 'Purchase', icon: '🛒' },
    { value: 'investment', label: 'Investment', icon: '📈' },
    { value: 'emergency', label: 'Emergency Fund', icon: '🚨' },
    { value: 'other', label: 'Other', icon: '🎯' },
  ];

  const icons = ['🎯', '💰', '🏠', '🚗', '✈️', '💍', '🎓', '💻', '📱', '🎮', '🏖️', '🎸'];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/goals');
      setGoals(response.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch goals' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (goal = null) => {
    if (goal) {
      setEditingGoal(goal);
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: new Date(goal.deadline).toISOString().split('T')[0],
        category: goal.category,
        icon: goal.icon,
        color: goal.color,
      });
    } else {
      setEditingGoal(null);
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '0',
        deadline: '',
        category: 'savings',
        icon: '🎯',
        color: '#10B981',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGoal) {
        await axios.put(`/goals/${editingGoal._id}`, formData);
        setAlert({ type: 'success', message: 'Goal updated successfully!' });
      } else {
        await axios.post('/goals', formData);
        setAlert({ type: 'success', message: 'Goal created successfully!' });
      }
      fetchGoals();
      setIsModalOpen(false);
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Operation failed' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`/goals/${id}`);
        setAlert({ type: 'success', message: 'Goal deleted successfully!' });
        fetchGoals();
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to delete goal' });
      }
    }
  };

  const handleAddMoney = async () => {
    if (!addAmount || addAmount <= 0) {
      setAlert({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    try {
      await axios.post(`/goals/${addMoneyModal._id}/add`, { amount: parseFloat(addAmount) });
      setAlert({ type: 'success', message: 'Money added to goal!' });
      fetchGoals();
      setAddMoneyModal(null);
      setAddAmount('');
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to add money' });
    }
  };

  const getProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const end = new Date(deadline);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="space-y-8">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

     {/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <div>
    <h1 className="text-4xl font-bold text-white mb-2 neon-text">Financial Goals 🎯</h1>
    <p className="text-gray-300">Track your savings goals and achieve them!</p>
  </div>
  
  <div className="flex gap-3">
    <Button3D icon={Plus} onClick={() => handleOpenModal()}>
      Add Goal
    </Button3D>
    
    <Button3D
      icon={Download}
      variant="secondary"
      onClick={() => exportGoalsToPDF(goals || [], user?.name || 'User')}
    >
      Export PDF
    </Button3D>
  </div>
</div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <GlassCard>
          <div className="text-center py-12">
            <Target size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No goals yet. Create one to get started!</p>
          </div>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const progress = getProgress(goal.currentAmount, goal.targetAmount);
            const daysLeft = getDaysLeft(goal.deadline);

            return (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className={goal.isCompleted ? 'border-green-500 success-glow' : ''}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{goal.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{goal.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{goal.category}</p>
                      </div>
                    </div>
                    {goal.isCompleted && (
                      <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-300 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Check size={14} /> Completed
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold text-white">
                        {formatCurrency(goal.currentAmount)}
                      </span>
                      <span className="text-gray-400">of {formatCurrency(goal.targetAmount)}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white bg-opacity-10 rounded-full h-4 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ backgroundColor: goal.color }}
                      />
                    </div>

                    <p className="text-right mt-2 font-semibold text-green-400">
                      {progress.toFixed(1)}%
                    </p>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} />
                      <span>{formatDate(goal.deadline)}</span>
                    </div>
                    <span className={`font-semibold ${daysLeft < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                      {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!goal.isCompleted && (
                      <Button3D
                        variant="success"
                        size="sm"
                        fullWidth
                        onClick={() => setAddMoneyModal(goal)}
                      >
                        Add Money
                      </Button3D>
                    )}
                    <button
                      onClick={() => handleOpenModal(goal)}
                      className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(goal._id)}
                      className="p-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingGoal ? 'Edit Goal' : 'Create Goal'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white font-medium mb-2">Goal Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., New Laptop, Vacation, Emergency Fund"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-gray-800">
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-white font-medium mb-2">Target Amount</label>
            <input
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              required
              min="0"
              step="1"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="50000"
            />
          </div>

          {/* Current Amount */}
          <div>
            <label className="block text-white font-medium mb-2">Current Amount (Optional)</label>
            <input
              type="number"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              min="0"
              step="1"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-white font-medium mb-2">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-white font-medium mb-2">Icon</label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    formData.icon === icon
                      ? 'bg-green-500 bg-opacity-30 border-2 border-green-500'
                      : 'bg-white bg-opacity-5 hover:bg-opacity-10'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-white font-medium mb-2">Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-20 h-12 rounded-lg cursor-pointer"
              />
              <span className="text-white">{formData.color}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button3D type="submit" variant="success" fullWidth>
              {editingGoal ? 'Update' : 'Create'}
            </Button3D>
            <Button3D type="button" variant="secondary" fullWidth onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button3D>
          </div>
        </form>
      </Modal>

      {/* Add Money Modal */}
      <Modal
        isOpen={!!addMoneyModal}
        onClose={() => {
          setAddMoneyModal(null);
          setAddAmount('');
        }}
        title={`Add Money to ${addMoneyModal?.name}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Amount to Add</label>
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              min="1"
              step="1"
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="1000"
            />
          </div>

          {addMoneyModal && (
            <div className="glass p-4 rounded-lg">
              <p className="text-gray-300 mb-2">
                Current: {formatCurrency(addMoneyModal.currentAmount)}
              </p>
              <p className="text-gray-300">
                After adding: {formatCurrency(addMoneyModal.currentAmount + (parseFloat(addAmount) || 0))}
              </p>
              <p className="text-gray-300 mt-2">
                Target: {formatCurrency(addMoneyModal.targetAmount)}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button3D variant="success" fullWidth onClick={handleAddMoney}>
              Add Money
            </Button3D>
            <Button3D
              variant="secondary"
              fullWidth
              onClick={() => {
                setAddMoneyModal(null);
                setAddAmount('');
              }}
            >
              Cancel
            </Button3D>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GoalsPage;