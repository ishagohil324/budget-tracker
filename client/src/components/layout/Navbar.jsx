import { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Palette } from 'lucide-react';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button3D from '../common/Button3D';
// import { useContext } from 'react';
// import { ThemeContext } from '../../context/ThemeContext';
// import { Palette } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
//   const { currentTheme, themes, changeTheme } = useContext(ThemeContext);

// const [showThemeMenu, setShowThemeMenu] = useState(false);


const { currentTheme, themes, changeTheme } = useContext(ThemeContext);
const [showThemeMenu, setShowThemeMenu] = useState(false);

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

          {/* Theme Selector */}
{/* <div className="relative">
  <button
    onClick={() => setShowThemeMenu(!showThemeMenu)}
    className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors"
  >
    <Palette size={20} />
  </button>
  
  {showThemeMenu && (
    <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-xl p-2 z-50">
      {Object.keys(themes).map((theme) => (
        <button
          key={theme}
          onClick={() => {
            changeTheme(theme);
            setShowThemeMenu(false);
          }}
          className={`w-full text-left px-4 py-2 rounded-lg mb-1 capitalize transition-colors ${
            currentTheme === theme
              ? 'bg-white bg-opacity-20 text-white font-semibold'
              : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
          }`}
        >
          <span
            className="inline-block w-4 h-4 rounded-full mr-2"
            style={{ background: themes[theme] }}
          />
          {theme}
        </button>
      ))}
    </div>
  )}
</div> */}

{/* Right: Theme + User + Logout */}
<div className="flex items-center gap-4">
  {/* Theme Selector */}
  <div className="relative">
    <button
      onClick={() => setShowThemeMenu(!showThemeMenu)}
      className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-colors"
      title="Change Theme"
    >
      <Palette size={20} />
    </button>

    {showThemeMenu && (
  <div className="absolute right-0 mt-2 w-56 bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-lg shadow-xl p-3 z-50 border border-gray-700">
    <p className="text-white font-semibold mb-3 text-sm">Choose Theme 🎨</p>
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {Object.keys(themes).map((themeKey) => (
        <button
          key={themeKey}
          onClick={() => {
            changeTheme(themeKey);
            setShowThemeMenu(false);
          }}
          className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
            currentTheme === themeKey
              ? 'bg-blue-600 text-white font-semibold ring-2 ring-blue-400'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex-shrink-0"
            style={{ background: themes[themeKey].gradient }}
          />
          <span className="text-sm font-medium">{themes[themeKey].name}</span>
        </button>
      ))}
    </div>
  </div>
)}
  </div>

  {/* User Info */}
  <div className="hidden sm:flex items-center gap-2 text-white">
    <User size={20} />
    <span className="font-medium">{user?.name}</span>
  </div>

  {/* Logout */}
  <Button3D variant="danger" size="sm" icon={LogOut} onClick={handleLogout}>
    <span className="hidden sm:inline">Logout</span>
  </Button3D>
</div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;