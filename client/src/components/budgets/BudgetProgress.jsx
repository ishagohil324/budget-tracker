import React from 'react';
import { motion } from 'framer-motion';

const BudgetProgress = ({ percentage }) => {
  const getProgressColor = (percent) => {
    if (percent >= 100) return '#EF4444'; // red
    if (percent >= 80) return '#F59E0B'; // yellow
    return '#10B981'; // green
  };

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ backgroundColor: getProgressColor(percentage) }}
      />
    </div>
  );
};

export default BudgetProgress;