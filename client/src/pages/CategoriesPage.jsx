import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import Button3D from '../components/common/Button3D';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import { categoryAPI } from '../utils/api';
import { DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from '../utils/constants';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [alert, setAlert] = useState(null);
  const [activeTab, setActiveTab] = useState('expense');

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    icon: '💰',
    color: '#3B82F6',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        type: activeTab,
        icon: '💰',
        color: '#3B82F6',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, formData);
        setAlert({ type: 'success', message: 'Category updated successfully!' });
      } else {
        await categoryAPI.create(formData);
        setAlert({ type: 'success', message: 'Category created successfully!' });
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Operation failed' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.delete(id);
        setAlert({ type: 'success', message: 'Category deleted successfully!' });
        fetchCategories();
      } catch (error) {
        setAlert({ type: 'error', message: error.response?.data?.message || 'Delete failed' });
      }
    }
  };

  const filteredCategories = categories.filter((c) => c.type === activeTab);

  const commonEmojis = ['💰', '💵', '💳', '🏦', '💸', '🛒', '🍔', '🚗', '✈️', '🏥', '📚', '🎬', '💼', '🎁', '🏠', '📱'];

  return (
    <div className="space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Categories 🏷️</h1>
          <p className="text-gray-300">Organize your transactions with custom categories</p>
        </div>
        <Button3D icon={Plus} onClick={() => handleOpenModal()}>
          Add Category
        </Button3D>
      </div>

      {/* Tabs */}
      <GlassCard>
        <div className="flex gap-4 border-b border-white border-opacity-20 pb-4">
          <button
            onClick={() => setActiveTab('expense')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'expense'
                ? 'bg-red-500 bg-opacity-20 text-red-300 border-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'income'
                ? 'bg-green-500 bg-opacity-20 text-green-300 border-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Income
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-300">No categories yet. Add your first one!</p>
            </div>
          ) : (
            filteredCategories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <div
                  className="p-4 rounded-xl text-center cursor-pointer transition-all hover:scale-105"
                  style={{ backgroundColor: `${category.color}20`, border: `2px solid ${category.color}` }}
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <p className="text-white font-medium text-sm">{category.name}</p>

                  {/* Edit/Delete buttons (show on hover) */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit size={14} className="text-white" />
                    </button>
                    {!category.isDefault && (
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-1 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={14} className="text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </GlassCard>

            {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Food, Rent, Salary"
            />
          </div>

          {/* Category Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {commonEmojis.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    formData.icon === emoji
                      ? 'bg-blue-500 scale-110'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-16 h-10 rounded cursor-pointer border-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-5 py-2 rounded-lg bg-gray-500 bg-opacity-20 text-gray-300 hover:bg-opacity-30"
            >
              Cancel
            </button>

            <Button3D type="submit">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button3D>
          </div>
        </form>
      </Modal>

  </div>);
}; 
export default CategoriesPage;