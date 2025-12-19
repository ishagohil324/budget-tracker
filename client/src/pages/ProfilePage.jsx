import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit2, Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import GlassCard from '../components/common/GlassCard';
import Button3D from '../components/common/Button3D';
import Alert from '../components/common/Alert';
import { formatDate } from '../utils/formatters';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement profile update API
    setAlert({ type: 'success', message: 'Profile updated successfully!' });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Profile 👤</h1>
        <p className="text-gray-300">Manage your account information</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>👤</span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{user?.name}</h2>
              <p className="text-gray-300 mb-1 flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} />
                {user?.email}
              </p>
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2">
                <Calendar size={16} />
                Member since {formatDate(user?.createdAt)}
              </p>
            </div>

            {/* Edit Button */}
            <Button3D
              icon={isEditing ? Save : Edit2}
              variant={isEditing ? 'success' : 'primary'}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button3D>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 pt-6 border-t border-white border-opacity-20"
            >
              {/* Name */}
              <div>
                <label className="block text-white font-medium mb-2">
                  <User size={18} className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-medium mb-2">
                  <Mail size={18} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Save Button */}
              <Button3D type="submit" variant="success" icon={Save} fullWidth>
                Save Changes
              </Button3D>
            </motion.form>
          )}
        </GlassCard>
      </motion.div>

      {/* Account Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard>
          <h3 className="text-2xl font-bold text-white mb-6">Account Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">0</p>
              <p className="text-gray-300">Total Transactions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-400 mb-2">0</p>
              <p className="text-gray-300">Active Budgets</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400 mb-2">0</p>
              <p className="text-gray-300">Categories</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
