const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.user.id })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single transaction
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check user owns transaction
    if (transaction.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date, paymentMethod, tags, receipt } = req.body;

    const transaction = new Transaction({
      user: req.user.user.id,
      type,
      category,
      amount,
      description,
      date,
      paymentMethod,
      tags,
      receipt
    });

    await transaction.save();

    // Update budget if expense
    if (type === 'expense') {
      const budget = await Budget.findOne({
        user: req.user.user.id,
        category: category
      });

      if (budget) {
       budget.spent = Number(budget.spent) + Number(amount);

        await budget.save();
      }
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check user owns transaction
    if (transaction.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { type, category, amount, description, date, paymentMethod, tags, receipt } = req.body;

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, category, amount, description, date, paymentMethod, tags, receipt },
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check user owns transaction
    if (transaction.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get transactions by date range
exports.getTransactionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const transactions = await Transaction.find({
      user: req.user.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get transaction statistics
exports.getTransactionStats = async (req, res) => {
  try {
    const userId = req.user.user.id;

    // 🔥 CURRENT MONTH RANGE
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const stats = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      }
    ]);

    const totalIncome = stats[0]?.totalIncome || 0;
    const totalExpense = stats[0]?.totalExpense || 0;

    // CATEGORY WISE (MONTHLY)
    const categoryExpenses = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: 'expense',
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryExpenses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
