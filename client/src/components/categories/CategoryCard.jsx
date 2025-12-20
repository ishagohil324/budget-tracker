import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="relative group">
      <div
        className="p-4 rounded-xl text-center cursor-pointer transition-all hover:scale-105"
        style={{
          backgroundColor: `${category.color}20`,
          border: `2px solid ${category.color}`,
        }}
      >
        <div className="text-4xl mb-2">{category.icon}</div>
        <p className="text-white font-medium text-sm">{category.name}</p>

        {/* Edit/Delete buttons (show on hover) */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit size={14} className="text-white" />
          </button>
          {!category.isDefault && (
            <button
              onClick={() => onDelete(category._id)}
              className="p-1 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 size={14} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;