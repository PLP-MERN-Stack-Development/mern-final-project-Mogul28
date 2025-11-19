import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Expense from '../models/Expense.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '.env.test' });

const app = express();
app.use(cors());
app.use(express.json());

// Mock auth middleware for testing
const mockProtect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};

// Expense routes
app.get('/api/expenses', mockProtect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

app.post('/api/expenses', mockProtect, async (req, res) => {
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
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

app.delete('/api/expenses/:id', mockProtect, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

describe('Expense Routes', () => {
  let testUser;
  let authToken;

  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/xtracker_test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Expense.deleteMany({});
    await User.deleteMany({});
    
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    authToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET || 'test-secret');
  });

  describe('GET /api/expenses', () => {
    it('should get all expenses for authenticated user', async () => {
      await Expense.create([
        { user: testUser._id, category: 'Food', description: 'Lunch', date: '2024-01-01', vendor: 'Restaurant', amount: 25.50 },
        { user: testUser._id, category: 'Transport', description: 'Gas', date: '2024-01-02', vendor: 'Gas Station', amount: 50.00 }
      ]);

      const res = await request(app)
        .get('/api/expenses')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .get('/api/expenses');

      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/expenses', () => {
    it('should create a new expense', async () => {
      const expenseData = {
        category: 'Food',
        description: 'Dinner',
        date: '2024-01-01',
        vendor: 'Restaurant',
        amount: 45.00
      };

      const res = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${authToken}`)
        .send(expenseData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.category).toBe(expenseData.category);
      expect(res.body.amount).toBe(expenseData.amount);
    });

    it('should not create expense with missing fields', async () => {
      const res = await request(app)
        .post('/api/expenses')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          category: 'Food'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          description: 'Dinner',
          date: '2024-01-01',
          vendor: 'Restaurant',
          amount: 45.00
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/expenses/:id', () => {
    it('should delete an expense', async () => {
      const expense = await Expense.create({
        user: testUser._id,
        category: 'Food',
        description: 'Lunch',
        date: '2024-01-01',
        vendor: 'Restaurant',
        amount: 25.50
      });

      const res = await request(app)
        .delete(`/api/expenses/${expense._id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(204);
    });

    it('should not delete non-existent expense', async () => {
      const res = await request(app)
        .delete('/api/expenses/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(404);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .delete('/api/expenses/507f1f77bcf86cd799439011');

      expect(res.statusCode).toBe(401);
    });
  });
});

