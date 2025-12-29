const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const auth = require('../middleware/auth');

// @route   GET /api/goals
router.get('/', auth, goalController.getGoals);

// @route   GET /api/goals/:id
router.get('/:id', auth, goalController.getGoal);

// @route   POST /api/goals
router.post('/', auth, goalController.createGoal);

// @route   PUT /api/goals/:id
router.put('/:id', auth, goalController.updateGoal);

// @route   DELETE /api/goals/:id
router.delete('/:id', auth, goalController.deleteGoal);

// @route   POST /api/goals/:id/add
router.post('/:id/add', auth, goalController.addToGoal);

module.exports = router;