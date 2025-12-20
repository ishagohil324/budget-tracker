import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

const StatsCard = ({ icon: Icon, label, value, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm mb-1">{label}</p>
            <h3 className="text-3xl font-bold" style={{ color }}>
              {value}
            </h3>
          </div>
          <Icon size={48} style={{ color, opacity: 0.8 }} />
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default StatsCard;