import React from 'react';
import Button3D from '../common/Button3D';

const CategoryForm = ({ formData, setFormData, onSubmit, isEditing, onCancel }) => {
  const commonEmojis = [
    '💰', '💵', '💳', '🏦', '💸', '🛒', '🍔', '🚗',
    '✈️', '🏥', '📚', '🎬', '💼', '🎁', '🏠', '📱',
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-white font-medium mb-2">Category Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Groceries"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-white font-medium mb-2">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="expense" className="bg-gray-800">
            Expense
          </option>
          <option value="income" className="bg-gray-800">
            Income
          </option>
        </select>
      </div>

      {/* Icon */}
      <div>
        <label className="block text-white font-medium mb-2">Icon</label>
        <div className="grid grid-cols-8 gap-2 mb-3">
          {commonEmojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setFormData({ ...formData, icon: emoji })}
              className={`text-2xl p-2 rounded-lg transition-all ${
                formData.icon === emoji
                  ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-500'
                  : 'bg-white bg-opacity-5 hover:bg-opacity-10'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          maxLength={2}
          className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Or type custom emoji"
        />
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
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="flex-1 px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3B82F6"
          />
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-white font-medium mb-2">Preview</label>
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: `${formData.color}20`,
            border: `2px solid ${formData.color}`,
          }}
        >
          <div className="text-5xl mb-2">{formData.icon}</div>
          <p className="text-white font-medium">{formData.name || 'Category Name'}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button3D type="submit" variant="success" fullWidth>
          {isEditing ? 'Update' : 'Create'}
        </Button3D>
        <Button3D type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button3D>
      </div>
    </form>
  );
};

export default CategoryForm;