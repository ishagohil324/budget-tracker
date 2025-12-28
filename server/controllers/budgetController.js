const Budget = require('../models/Budget');

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.user.id })
      .sort({ createdAt: -1 });
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single budget
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Check user owns budget
    if (budget.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create budget
exports.createBudget = async (req, res) => {
  try {
    const { category, limit, period, startDate, endDate, alertThreshold } = req.body;

    // Check if budget already exists for this category
    const existingBudget = await Budget.findOne({
      user: req.user.user.id,
      category: category
    });

    if (existingBudget) {
      return res.status(400).json({ message: 'Budget already exists for this category' });
    }

    const budget = new Budget({
      user: req.user.user.id,
      category,
      limit,
      period,
      startDate,
      endDate,
      alertThreshold
    });

    await budget.save();
    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Check user owns budget
    if (budget.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { category, limit,  period, startDate, endDate, alertThreshold } = req.body;

    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { category, limit,  period, startDate, endDate, alertThreshold },
      { new: true }
    );

    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Check user owns budget
    if (budget.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.json({ message: 'Budget deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get budget alerts (budgets exceeding threshold)
exports.getBudgetAlerts = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.user.id });

    const alerts = budgets.filter(budget => {
      const percentage = (budget.spent / budget.limit) * 100;
      return percentage >= budget.alertThreshold;
    });

    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};