const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// All routes are protected (need authentication)

// @route   GET /api/transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', auth, transactionController.getTransactions);

// @route   GET /api/transactions/stats
// @desc    Get transaction statistics
// @access  Private
router.get('/stats', auth, transactionController.getTransactionStats);

// @route   GET /api/transactions/daterange
// @desc    Get transactions by date range
// @access  Private
router.get('/daterange', auth, transactionController.getTransactionsByDateRange);

// @route   GET /api/transactions/:id
// @desc    Get single transaction
// @access  Private
router.get('/:id', auth, transactionController.getTransaction);

// @route   POST /api/transactions
// @desc    Create transaction
// @access  Private
router.post('/', auth, transactionController.createTransaction);

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', auth, transactionController.updateTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, transactionController.deleteTransaction);

module.exports = router;