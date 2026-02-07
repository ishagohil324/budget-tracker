// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// Payment methods
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash', icon: '💵' },
  { value: 'card', label: 'Card', icon: '💳' },
  { value: 'upi', label: 'UPI', icon: '📱' },
  { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
  { value: 'other', label: 'Other', icon: '💰' },
];

// Budget periods
export const BUDGET_PERIODS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

// Default expense categories
export const DEFAULT_EXPENSE_CATEGORIES = [
  { name: 'Food & Dining', icon: '🍔', color: '#EF4444' },
  { name: 'Transportation', icon: '🚗', color: '#F59E0B' },
  { name: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { name: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
  { name: 'Bills & Utilities', icon: '💡', color: '#3B82F6' },
  { name: 'Healthcare', icon: '🏥', color: '#10B981' },
  { name: 'Education', icon: '📚', color: '#6366F1' },
  { name: 'Travel', icon: '✈️', color: '#14B8A6' },
  { name: 'Groceries', icon: '🛒', color: '#84CC16' },
  { name: 'Other', icon: '📦', color: '#6B7280' },
];

// Default income categories
export const DEFAULT_INCOME_CATEGORIES = [
  { name: 'Salary', icon: '💼', color: '#10B981' },
  { name: 'Freelance', icon: '💻', color: '#3B82F6' },
  { name: 'Business', icon: '🏢', color: '#8B5CF6' },
  { name: 'Investments', icon: '📈', color: '#F59E0B' },
  { name: 'Gift', icon: '🎁', color: '#EC4899' },
  { name: 'Other', icon: '💰', color: '#6B7280' },
];

// Chart colors
export const CHART_COLORS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', 
  '#10B981', '#EF4444', '#14B8A6', '#6366F1',
  '#84CC16', '#F97316', '#06B6D4', '#A855F7'
];

// Date formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// API endpoints
export const API_BASE_URL = 'https://budget-tracker-m9o1.onrender.com/api';

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

// Alert thresholds
export const ALERT_THRESHOLDS = [
  { value: 50, label: '50%' },
  { value: 75, label: '75%' },
  { value: 80, label: '80%' },
  { value: 90, label: '90%' },
  { value: 100, label: '100%' },
];

// Animation variants for framer-motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideDown: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideLeft: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  slideRight: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  },
};