import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Wallet, 
  TrendingUp, 
  Tag, 
  User,
  Target,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/budgets', icon: Wallet, label: 'Budgets' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/categories', icon: Tag, label: 'Categories' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/profile', icon: User, label: 'Profile' },
    
  ];


  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 z-50
          glass border-r border-white border-opacity-20
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close Button (Mobile Only) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden self-end text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg mb-4"
          >
            <X size={24} />
          </button>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white border-opacity-20 pt-4 text-center text-gray-400 text-sm">
            <p>© 2025 Budget Tracker</p>
            <p className="mt-1">Made with 💜</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;