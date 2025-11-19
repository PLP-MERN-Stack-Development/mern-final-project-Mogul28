import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import connectDB from './config/database.js';
import Expense from './models/Expense.js';
import authRoutes from './routes/auth.js';
import { protect } from './middleware/auth.js';

dotenv.config();

// Initialize Sentry for error tracking
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
  });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI environment variable is required');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('ERROR: JWT_SECRET environment variable is required in production');
    process.exit(1);
  } else {
    console.warn('WARNING: JWT_SECRET not set, using default (not secure for production)');
  }
}

// Middleware
// CORS configuration - allow frontend domain in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? (process.env.FRONTEND_URL || '*')
    : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Sentry request handler
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Expense Tracker API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Protected expense routes
// Get all expenses for the logged-in user
app.get('/api/expenses', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get expense by ID (must belong to user)
app.get('/api/expenses/:id', protect, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

// Create new expense (associated with logged-in user)
app.post('/api/expenses', protect, async (req, res) => {
  try {
    const { category, description, date, vendor, amount } = req.body;
    
    if (!category || !description || !date || !vendor || amount === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newExpense = new Expense({
      user: req.user._id,
      category,
      description,
      date,
      vendor,
      amount: parseFloat(amount)
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Update expense (must belong to user)
app.put('/api/expenses/:id', protect, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const { category, description, date, vendor, amount } = req.body;
    if (category) expense.category = category;
    if (description) expense.description = description;
    if (date) expense.date = date;
    if (vendor) expense.vendor = vendor;
    if (amount !== undefined) expense.amount = parseFloat(amount);

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Delete expense (must belong to user)
app.delete('/api/expenses/:id', protect, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Get categories (public endpoint)
app.get('/api/categories', (req, res) => {
  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Other'
  ];
  res.json(categories);
});

// Sentry error handler (must be after all routes)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server after database connection
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
