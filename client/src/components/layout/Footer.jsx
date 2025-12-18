import React from 'react';

const Footer = () => {
  return (
    <footer className="glass border-t border-white border-opacity-20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-gray-300">
          <p className="text-sm">
            © 2024 Budget Tracker 3D. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Built with ❤️ using React, Node.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;