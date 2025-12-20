import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, PieChart, Target } from 'lucide-react';
import Button3D from '../components/common/Button3D';
import GlassCard from '../components/common/GlassCard';

const Home = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Track Expenses',
      description: 'Monitor your daily expenses and income in real-time',
    },
    {
      icon: Target,
      title: 'Set Budgets',
      description: 'Create budgets for different categories and stay on track',
    },
    {
      icon: PieChart,
      title: '3D Analytics',
      description: 'Visualize your spending with stunning 3D charts',
    },
    {
      icon: TrendingUp,
      title: 'Smart Insights',
      description: 'Get personalized insights and spending predictions',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          💰 Budget Tracker 
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          Track your finances with stunning 3D visualizations
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/login">
            <Button3D variant="primary" size="lg">
              Login
            </Button3D>
          </Link>
          <Link to="/register">
            <Button3D variant="success" size="lg">
              Get Started Free
            </Button3D>
          </Link>
        </div>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="text-center h-full">
              <feature.icon size={48} className="text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center text-gray-300"
      >
        <p>© 2025 Budget Tracker . Built with ❤️ by Students</p>
      </motion.div>
    </div>
  );
};

export default Home;