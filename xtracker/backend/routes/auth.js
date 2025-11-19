import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

// Helper function to check database connection
const checkDatabaseConnection = () => {
  return mongoose.connection.readyState === 1; // 1 = connected
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key-change-in-production', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    // Check database connection first
    if (!checkDatabaseConnection()) {
      console.error('Database not connected. Connection state:', mongoose.connection.readyState);
      return res.status(503).json({ 
        error: 'Database connection failed. Please ensure MongoDB is running and MONGODB_URI is set correctly.',
        details: 'The server cannot connect to the database. Check your MONGODB_URI environment variable and ensure MongoDB is running.'
      });
    }

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Database connection state:', mongoose.connection.readyState);
    
    // Provide more specific error messages
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    // Check for database connection errors
    if (error.name === 'MongooseError' || 
        error.name === 'MongoNetworkError' || 
        error.name === 'MongoTimeoutError' ||
        error.message?.includes('MongoDB') ||
        error.message?.includes('connection') ||
        error.message?.includes('connect ECONNREFUSED') ||
        !checkDatabaseConnection()) {
      return res.status(503).json({ 
        error: 'Database connection failed. Please ensure MongoDB is running and MONGODB_URI is set correctly.',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message,
          connectionState: mongoose.connection.readyState,
          hint: 'Check your .env file for MONGODB_URI and ensure MongoDB is running'
        })
      });
    }
    
    res.status(500).json({ 
      error: 'Server error during signup',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.message,
        errorName: error.name,
        stack: error.stack
      })
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate a user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    // Check database connection first
    if (!checkDatabaseConnection()) {
      console.error('Database not connected. Connection state:', mongoose.connection.readyState);
      return res.status(503).json({ 
        error: 'Database connection failed. Please ensure MongoDB is running and MONGODB_URI is set correctly.',
        details: 'The server cannot connect to the database. Check your MONGODB_URI environment variable and ensure MongoDB is running.'
      });
    }

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Database connection state:', mongoose.connection.readyState);
    
    // Check for database connection errors
    if (error.name === 'MongooseError' || 
        error.name === 'MongoNetworkError' || 
        error.name === 'MongoTimeoutError' ||
        error.message?.includes('MongoDB') ||
        error.message?.includes('connection') ||
        error.message?.includes('connect ECONNREFUSED') ||
        !checkDatabaseConnection()) {
      return res.status(503).json({ 
        error: 'Database connection failed. Please ensure MongoDB is running and MONGODB_URI is set correctly.',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message,
          connectionState: mongoose.connection.readyState,
          hint: 'Check your .env file for MONGODB_URI and ensure MongoDB is running'
        })
      });
    }
    
    res.status(500).json({ 
      error: 'Server error during login',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.message,
        errorName: error.name,
        stack: error.stack
      })
    });
  }
});

export default router;

