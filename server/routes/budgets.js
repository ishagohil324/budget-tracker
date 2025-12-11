const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/auth');

// All routes are protected (need authentication)

// @route   GET /api/budgets
// @desc    Get all budgets for user
// @access  Private
router.get('/', auth, budgetController.getBudgets);

// @route   GET /api/budgets/alerts
// @desc    Get budget alerts
// @access  Private
router.get('/alerts', auth, budgetController.getBudgetAlerts);

// @route   GET /api/budgets/:id
// @desc    Get single budget
// @access  Private
router.get('/:id', auth, budgetController.getBudget);

// @route   POST /api/budgets
// @desc    Create budget
// @access  Private
router.post('/', auth, budgetController.createBudget);

// @route   PUT /api/budgets/:id
// @desc    Update budget
// @access  Private
router.put('/:id', auth, budgetController.updateBudget);

// @route   DELETE /api/budgets/:id
// @desc    Delete budget
// @access  Private
router.delete('/:id', auth, budgetController.deleteBudget);

module.exports = router;