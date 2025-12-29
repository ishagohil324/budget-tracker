const Goal = require('../models/Goal');

// Get all goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single goal
exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create goal
exports.createGoal = async (req, res) => {
  try {
    const { name, targetAmount, currentAmount, deadline, category, icon, color } = req.body;

    const goal = new Goal({
      user: req.user.user.id,
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      category,
      icon,
      color
    });

    await goal.save();
    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update goal
exports.updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, targetAmount, currentAmount, deadline, category, icon, color, isCompleted } = req.body;

    goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { name, targetAmount, currentAmount, deadline, category, icon, color, isCompleted },
      { new: true }
    );

    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add money to goal
exports.addToGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    goal.currentAmount += amount;
    
    // Check if goal completed
    if (goal.currentAmount >= goal.targetAmount) {
      goal.isCompleted = true;
    }

    await goal.save();
    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};