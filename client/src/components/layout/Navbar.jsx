import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button3D from '../common/Button3D';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-30 border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="text-3xl">💰</span>
              <span className="text-2xl font-bold text-white hidden sm:block">
                Budget Tracker
              </span>
            </Link>
          </div>

          {/* Right: User Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-white">
              <User size={20} />
              <span className="font-medium">{user?.name}</span>
            </div>
            <Button3D
              variant="danger"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
            >
              <span className="hidden sm:inline">Logout</span>
            </Button3D>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;