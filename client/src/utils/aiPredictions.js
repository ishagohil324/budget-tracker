// AI-powered predictions and insights

// Predict next month's spending based on historical data
export const predictNextMonthSpending = (transactions) => {
  if (transactions.length < 3) {
    return {
      prediction: 0,
      confidence: 'low',
      message: 'Need more data for accurate predictions',
    };
  }

  // Get last 3 months of expenses
  const expenses = transactions.filter((t) => t.type === 'expense');
  const last3Months = expenses.slice(0, Math.min(90, expenses.length));

  // Calculate average
  const total = last3Months.reduce((sum, t) => sum + t.amount, 0);
  const average = total / 3;

  // Calculate trend (increasing or decreasing)
  const recent = last3Months.slice(0, 30).reduce((sum, t) => sum + t.amount, 0);
  const older = last3Months.slice(30, 60).reduce((sum, t) => sum + t.amount, 0);
  const trend = older > 0 ? ((recent - older) / older) * 100 : 0;

  // Apply trend to prediction
  const prediction = average * (1 + trend / 100);

  return {
    prediction: Math.round(prediction),
    trend: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable',
    trendPercentage: Math.abs(Math.round(trend)),
    confidence: last3Months.length > 60 ? 'high' : last3Months.length > 30 ? 'medium' : 'low',
    message: `Based on your last 3 months, predicted spending: ${Math.round(prediction)}`,
  };
};

// Detect unusual transactions (outliers)
export const detectUnusualTransactions = (transactions) => {
  if (transactions.length < 10) return [];

  const expenses = transactions.filter((t) => t.type === 'expense');
  const amounts = expenses.map((t) => t.amount);

  // Calculate mean and standard deviation
  const mean = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  const variance = amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amounts.length;
  const stdDev = Math.sqrt(variance);

  // Find outliers (more than 2 standard deviations from mean)
  const unusual = expenses.filter((t) => {
    const zScore = Math.abs((t.amount - mean) / stdDev);
    return zScore > 2;
  });

  return unusual.slice(0, 5); // Return top 5 unusual
};

// Identify spending patterns by day of week
export const analyzeSpendingByDay = (transactions) => {
  const dayTotals = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const dayCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const day = new Date(t.date).getDay();
      dayTotals[day] += t.amount;
      dayCounts[day] += 1;
    });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const analysis = Object.keys(dayTotals).map((day) => ({
    day: dayNames[day],
    total: dayTotals[day],
    average: dayCounts[day] > 0 ? dayTotals[day] / dayCounts[day] : 0,
    count: dayCounts[day],
  }));

  // Find highest spending day
  const highestDay = analysis.reduce((max, curr) => (curr.total > max.total ? curr : max));

  return {
    byDay: analysis,
    highestSpendingDay: highestDay.day,
    insight: `You spend most on ${highestDay.day}s`,
  };
};

// Suggest budget amounts based on spending history
export const suggestBudgets = (transactions, existingBudgets) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  
  // Group by category
  const categoryTotals = {};
  const categoryCounts = {};

  expenses.forEach((t) => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
      categoryCounts[t.category] = 0;
    }
    categoryTotals[t.category] += t.amount;
    categoryCounts[t.category] += 1;
  });

  // Calculate average per category
  const suggestions = Object.keys(categoryTotals)
    .map((category) => {
      const average = categoryTotals[category] / categoryCounts[category];
      const total = categoryTotals[category];
      
      // Check if budget already exists
      const existingBudget = existingBudgets.find((b) => b.category === category);
      
      // Suggest 10% buffer above average spending
      const suggested = Math.round(average * 1.1);

      return {
        category,
        suggested,
        current: existingBudget ? existingBudget.limit : 0,
        averageSpending: Math.round(average),
        totalSpent: Math.round(total),
        hasExisting: !!existingBudget,
        needsUpdate: existingBudget && existingBudget.limit < suggested,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent);

  return suggestions.slice(0, 5); // Top 5 categories
};

// Identify savings opportunities
export const findSavingsOpportunities = (transactions, budgets) => {
  const opportunities = [];

  // 1. Check for overspending categories
  const expenses = transactions.filter((t) => t.type === 'expense');
  const categorySpending = {};

  expenses.forEach((t) => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
  });

  // Find categories spending over budget
  budgets.forEach((budget) => {
    if (budget.spent > budget.limit) {
      const overspent = budget.spent - budget.limit;
      opportunities.push({
        type: 'overbudget',
        category: budget.category,
        message: `You overspent by ${overspent} in ${budget.category}`,
        savings: overspent,
        priority: 'high',
      });
    }
  });

  // 2. Check for frequent small expenses (potential for savings)
  const smallExpenses = expenses.filter((t) => t.amount < 500);
  const categorySmall = {};

  smallExpenses.forEach((t) => {
    categorySmall[t.category] = (categorySmall[t.category] || 0) + 1;
  });

  Object.keys(categorySmall).forEach((category) => {
    if (categorySmall[category] > 10) {
      const total = expenses
        .filter((t) => t.category === category && t.amount < 500)
        .reduce((sum, t) => sum + t.amount, 0);

      opportunities.push({
        type: 'frequent_small',
        category,
        message: `${categorySmall[category]} small purchases in ${category} (${Math.round(total)})`,
        savings: Math.round(total * 0.2), // Could save 20%
        priority: 'medium',
      });
    }
  });

  // 3. Check for duplicate subscriptions or regular payments
  const recurringExpenses = findRecurringExpenses(expenses);
  if (recurringExpenses.length > 0) {
    opportunities.push({
      type: 'recurring',
      message: `Found ${recurringExpenses.length} recurring expenses`,
      savings: 0,
      priority: 'low',
      details: recurringExpenses,
    });
  }

  return opportunities.sort((a, b) => {
    const priority = { high: 3, medium: 2, low: 1 };
    return priority[b.priority] - priority[a.priority];
  });
};

// Helper: Find recurring expenses
const findRecurringExpenses = (expenses) => {
  const recurring = [];
  const categoryMonths = {};

  expenses.forEach((t) => {
    const month = new Date(t.date).toISOString().slice(0, 7);
    const key = `${t.category}-${t.amount}`;

    if (!categoryMonths[key]) {
      categoryMonths[key] = new Set();
    }
    categoryMonths[key].add(month);
  });

  Object.keys(categoryMonths).forEach((key) => {
    if (categoryMonths[key].size >= 2) {
      const [category, amount] = key.split('-');
      recurring.push({
        category,
        amount: parseFloat(amount),
        frequency: categoryMonths[key].size,
      });
    }
  });

  return recurring;
};

// Generate personalized insights
export const generateInsights = (transactions, budgets, stats) => {
  const insights = [];

  // Insight 1: Savings rate
  if (stats?.totalIncome > 0) {
    const savingsRate = (stats.balance / stats.totalIncome) * 100;
    if (savingsRate < 10) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Low Savings Rate',
        message: `You're only saving ${savingsRate.toFixed(1)}% of your income. Aim for at least 20%!`,
        action: 'Create a savings goal',
      });
    } else if (savingsRate > 30) {
      insights.push({
        type: 'success',
        icon: '🎉',
        title: 'Excellent Saver!',
        message: `You're saving ${savingsRate.toFixed(1)}% of your income. Keep it up!`,
      });
    }
  }

  // Insight 2: Budget adherence
  const overBudgetCount = budgets.filter((b) => b.spent > b.limit).length;
  if (overBudgetCount > 0) {
    insights.push({
      type: 'warning',
      icon: '📊',
      title: 'Budget Alert',
      message: `You exceeded ${overBudgetCount} budget${overBudgetCount > 1 ? 's' : ''} this month`,
      action: 'Review your budgets',
    });
  }

  // Insight 3: Spending trend
  const prediction = predictNextMonthSpending(transactions);
  if (prediction.trend === 'increasing' && prediction.trendPercentage > 10) {
    insights.push({
      type: 'info',
      icon: '📈',
      title: 'Spending Increasing',
      message: `Your spending is up ${prediction.trendPercentage}% compared to last month`,
      action: 'Review recent expenses',
    });
  }

  // Insight 4: Unusual transactions
  const unusual = detectUnusualTransactions(transactions);
  if (unusual.length > 0) {
    insights.push({
      type: 'info',
      icon: '🔍',
      title: 'Unusual Transactions',
      message: `Found ${unusual.length} unusually large transaction${unusual.length > 1 ? 's' : ''}`,
      action: 'Review transactions',
    });
  }

  // Insight 5: Category with most spending
  if (stats?.categoryExpenses?.length > 0) {
    const topCategory = stats.categoryExpenses[0];
    insights.push({
      type: 'info',
      icon: '💰',
      title: 'Top Spending Category',
      message: `${topCategory._id} is your highest expense at ${Math.round((topCategory.total / stats.totalExpense) * 100)}%`,
    });
  }

  return insights;
};