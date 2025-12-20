import React from 'react';
import Button3D from '../common/Button3D';
import { BUDGET_PERIODS } from '../../utils/constants';

const BudgetForm = ({ formData, setFormData, onSubmit, isEditing, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          onChange={(e) =>
            setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })
          }
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
          {isEditing ? 'Update' : 'Create'}
        </Button3D>
        <Button3D type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button3D>
      </div>
    </form>
  );
};

export default BudgetForm;