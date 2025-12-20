import React from 'react';
import Button3D from '../common/Button3D';
import { PAYMENT_METHODS } from '../../utils/constants';

const TransactionForm = ({ formData, setFormData, onSubmit, isEditing, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          {isEditing ? 'Update' : 'Create'}
        </Button3D>
        <Button3D type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button3D>
      </div>
    </form>
  );
};

export default TransactionForm;