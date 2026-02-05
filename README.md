# 💰 Budget Tracker with Data Analytics Dashboard (MERN)

A full-stack **Budget Tracker Web Application** built using the **MERN Stack** that helps users manage their finances by tracking **income, expenses, budgets, and financial goals**.  
It includes an **interactive analytics dashboard** with visualizations for spending trends, category breakdowns, and monthly insights.

---

## 🚀 Features

### 🔐 Authentication
- User Signup / Login
- Secure password hashing
- JWT-based authentication

### 💵 Budget & Expense Tracking
- Add / edit / delete income and expenses
- Categorize transactions (Food, Rent, Travel, etc.)
- Set monthly budgets per category
- Track savings goals

### 📊 Data Analytics Dashboard
- Monthly spending trends
- Category-wise expense charts
- Income vs Expense overview
- Interactive data visualization

### 🤖 AI-Driven Insights (Optional / Planned)
- Spending habit insights
- Budget alerts when overspending
- Goal progress suggestions

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Chart.js / Recharts (or any chart library)
- Tailwind CSS / Bootstrap (depending on your setup)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

---

Setup Instructions (Run Locally)

1) git clone https://github.com/your-username/budget-tracker.git
cd budget-tracker

2)(backend)cd server
npm install

3)(frontend)cd ../client
npm install

4)Create .env File (Backend)
Inside the server/ folder, create a .env file:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/budget_tracker
JWT_SECRET=your_super_secret_jwt_key


Run the App
* for backend
  -cd server
  -npm run dev

* for frontend
 - cd ../client
 - npm start



