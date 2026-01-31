// const connectDB = require('./config/db');
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const goalRoutes = require('./routes/goals');


// // Load environment variables
// dotenv.config();

// // Connect to Database
//  connectDB();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Import Routes
//    const authRoutes = require('./routes/auth');
//    const transactionRoutes = require('./routes/transactions');
//    const budgetRoutes = require('./routes/budgets');
//    const categoryRoutes = require('./routes/categories');

//    // Use Routes
//    app.use('/api/auth', authRoutes);
//    app.use('/api/transactions', transactionRoutes);
//    app.use('/api/budgets', budgetRoutes);
//    app.use('/api/categories', categoryRoutes);
//    app.use('/api/goals', goalRoutes);

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Budget Tracker API is running! ' });
// });

// // TEST ROUTE - Create a sample user
// app.post('/test/user', async (req, res) => {
//   try {
//     const User = require('./models/User');
    
//     const testUser = new User({
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'password123',
//       avatar: 'https://via.placeholder.com/150'
//     });

//     await testUser.save();
//     res.json({ message: 'Test user created!', user: testUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error: error.message });
//   }
// });

// // Port
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express app
const app = express();

// Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || '*',
//   credentials: true
// }));
 app.use(express.json());


app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://budget-tracker-m901.onrender.com'
    ],
    credentials: true,
  })
);



// Import Routes
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');
const categoryRoutes = require('./routes/categories');
const goalRoutes = require('./routes/goals');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/goals', goalRoutes);

// Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Budget Tracker API is running! 🚀' });
// });

app.get('/', (req, res) => {
  res.send('Budget Tracker API is running 🚀');
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});



// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ```

// ---

// ### **B) Create .gitignore in server folder**

// **Create file: `server/.gitignore`**
// ```
// node_modules/
// .env
// *.log
// ```

// ---

// ### **C) Update server/.env (Keep your current values)**

// Make sure your `server/.env` has:
// ```
// PORT=5000
// MONGO_URI=mongodb+srv://budgetuser:8a7MZGMxxtnMCk1N@budgetracker.ave2vur.mongodb.net/budgettracker?retryWrites=true&w=majority
// JWT_SECRET=your_super_secret_key_12345
// ```

// ---

// ### **D) Create .gitignore in client folder**

// **Create file: `client/.gitignore`**
// ```
// node_modules/
// build/
// .env
// *.log