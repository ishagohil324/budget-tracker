import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose, autoClose = true }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const types = {
    success: {
      bg: 'bg-green-500 bg-opacity-20',
      border: 'border-green-500',
      text: 'text-green-100',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-500 bg-opacity-20',
      border: 'border-red-500',
      text: 'text-red-100',
      icon: XCircle,
    },
    warning: {
      bg: 'bg-yellow-500 bg-opacity-20',
      border: 'border-yellow-500',
      text: 'text-yellow-100',
      icon: AlertTriangle,
    },
    info: {
      bg: 'bg-blue-500 bg-opacity-20',
      border: 'border-blue-500',
      text: 'text-blue-100',
      icon: Info,
    },
  };

  const config = types[type];
  const Icon = config.icon;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`
            ${config.bg} ${config.border} ${config.text}
            border-l-4 p-4 rounded-lg shadow-lg
            flex items-start gap-3 backdrop-blur-sm
          `}
        >
          <Icon size={24} className="flex-shrink-0 mt-0.5" />
          <p className="flex-1 font-medium">{message}</p>
          {onClose && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
              <X size={20} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;