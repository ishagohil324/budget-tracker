import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// client/
// ├── public/
// │   ├── index.html
// │   └── favicon.ico
// │
// ├── src/
// │   ├── components/
// │   │   ├── auth/
// │   │   │   ├── Login.jsx
// │   │   │   ├── Register.jsx
// │   │   │   └── PrivateRoute.jsx
// │   │   │
// │   │   ├── layout/
// │   │   │   ├── Navbar.jsx
// │   │   │   ├── Sidebar.jsx
// │   │   │   └── Footer.jsx
// │   │   │
// │   │   ├── dashboard/
// │   │   │   ├── Dashboard.jsx
// │   │   │   ├── StatsCard.jsx
// │   │   │   ├── BalanceCard3D.jsx
// │   │   │   ├── RecentTransactions.jsx
// │   │   │   └── QuickActions.jsx
// │   │   │
// │   │   ├── transactions/
// │   │   │   ├── TransactionList.jsx
// │   │   │   ├── TransactionForm.jsx
// │   │   │   ├── TransactionCard.jsx
// │   │   │   └── TransactionFilter.jsx
// │   │   │
// │   │   ├── budgets/
// │   │   │   ├── BudgetList.jsx
// │   │   │   ├── BudgetForm.jsx
// │   │   │   ├── BudgetCard.jsx
// │   │   │   └── BudgetProgress.jsx
// │   │   │
// │   │   ├── analytics/
// │   │   │   ├── Analytics.jsx
// │   │   │   ├── PieChart3D.jsx
// │   │   │   ├── LineChart3D.jsx
// │   │   │   ├── BarChart3D.jsx
// │   │   │   └── SpendingTrends.jsx
// │   │   │
// │   │   ├── categories/
// │   │   │   ├── CategoryList.jsx
// │   │   │   ├── CategoryForm.jsx
// │   │   │   └── CategoryCard.jsx
// │   │   │
// │   │   └── common/
// │   │       ├── Loading.jsx
// │   │       ├── GlassCard.jsx
// │   │       ├── Button3D.jsx
// │   │       ├── Modal.jsx
// │   │       └── Alert.jsx
// │   │
// │   ├── pages/
// │   │   ├── Home.jsx
// │   │   ├── DashboardPage.jsx
// │   │   ├── TransactionsPage.jsx
// │   │   ├── BudgetsPage.jsx
// │   │   ├── AnalyticsPage.jsx
// │   │   ├── CategoriesPage.jsx
// │   │   └── ProfilePage.jsx
// │   │
// │   ├── context/
// │   │   ├── AuthContext.jsx
// │   │   ├── TransactionContext.jsx
// │   │   ├── BudgetContext.jsx
// │   │   └── ThemeContext.jsx
// │   │
// │   ├── utils/
// │   │   ├── api.js
// │   │   ├── axios.js
// │   │   ├── formatters.js
// │   │   └── constants.js
// │   │
// │   ├── hooks/
// │   │   ├── useAuth.js
// │   │   ├── useTransactions.js
// │   │   └── useBudgets.js
// │   │
// │   ├── styles/
// │   │   ├── globals.css
// │   │   └── animations.css
// │   │
// │   ├── App.js
// │   ├── App.css
// │   └── index.js
// │
// ├── package.json
// └── tailwind.config.js








// server/
// ├── config/
// │   └── db.js ✅ (Database connection)
// ├── controllers/
// │   ├── authController.js ✅ (Register, Login, Get User)
// │   ├── transactionController.js ✅ (CRUD + Stats)
// │   ├── budgetController.js ✅ (CRUD + Alerts)
// │   └── categoryController.js ✅ (CRUD + By Type)
// ├── models/
// │   ├── User.js ✅ (User schema)
// │   ├── Transaction.js ✅ (Transaction schema)
// │   ├── Budget.js ✅ (Budget schema)
// │   └── Category.js ✅ (Category schema)
// ├── routes/
// │   ├── auth.js ✅ (Auth routes)
// │   ├── transactions.js ✅ (Transaction routes)
// │   ├── budgets.js ✅ (Budget routes)
// │   └── categories.js ✅ (Category routes)
// ├── middleware/
// │   └── auth.js ✅ (JWT authentication)
// ├── .env ✅ (Environment variables)
// ├── server.js ✅ (Main server file)
// └── package.json ✅