const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to Database
 connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
   const authRoutes = require('./routes/auth');
   const transactionRoutes = require('./routes/transactions');
   const budgetRoutes = require('./routes/budgets');
   const categoryRoutes = require('./routes/categories');

   // Use Routes
   app.use('/api/auth', authRoutes);
   app.use('/api/transactions', transactionRoutes);
   app.use('/api/budgets', budgetRoutes);
   app.use('/api/categories', categoryRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Budget Tracker API is running! 🚀' });
});

// TEST ROUTE - Create a sample user
app.post('/test/user', async (req, res) => {
  try {
    const User = require('./models/User');
    
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      avatar: 'https://via.placeholder.com/150'
    });

    await testUser.save();
    res.json({ message: 'Test user created!', user: testUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});