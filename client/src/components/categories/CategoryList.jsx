import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300 text-lg">No categories yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <CategoryCard category={category} onEdit={onEdit} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;