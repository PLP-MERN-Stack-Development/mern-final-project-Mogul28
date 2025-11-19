import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Expense from '../models/Expense.js';

dotenv.config();

const sampleExpenses = [
  {
    category: 'Food & Dining',
    description: 'Lunch at downtown cafe',
    date: '2025-11-15',
    vendor: 'Blue Cafe',
    amount: 28.50
  },
  {
    category: 'Transportation',
    description: 'Uber ride to office',
    date: '2025-11-14',
    vendor: 'Uber',
    amount: 15.20
  },
  {
    category: 'Shopping',
    description: 'Office supplies',
    date: '2025-11-13',
    vendor: 'Staples',
    amount: 45.99
  },
  {
    category: 'Food & Dining',
    description: 'Groceries',
    date: '2025-11-12',
    vendor: 'Whole Foods',
    amount: 127.80
  },
  {
    category: 'Utilities',
    description: 'Internet bill',
    date: '2025-11-10',
    vendor: 'Comcast',
    amount: 79.99
  },
  {
    category: 'Entertainment',
    description: 'Movie tickets',
    date: '2025-11-09',
    vendor: 'AMC Theatres',
    amount: 32.00
  },
  {
    category: 'Transportation',
    description: 'Gas fill-up',
    date: '2025-11-08',
    vendor: 'Shell',
    amount: 52.30
  },
  {
    category: 'Food & Dining',
    description: 'Dinner with friends',
    date: '2025-11-07',
    vendor: 'Italian Bistro',
    amount: 85.40
  },
  {
    category: 'Healthcare',
    description: 'Pharmacy prescription',
    date: '2025-11-05',
    vendor: 'CVS Pharmacy',
    amount: 24.50
  },
  {
    category: 'Shopping',
    description: 'Clothing purchase',
    date: '2025-11-03',
    vendor: 'H&M',
    amount: 68.75
  },
  {
    category: 'Utilities',
    description: 'Electric bill',
    date: '2025-10-28',
    vendor: 'City Electric',
    amount: 95.20
  },
  {
    category: 'Food & Dining',
    description: 'Coffee and pastries',
    date: '2025-10-25',
    vendor: 'Starbucks',
    amount: 12.80
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing expenses
    await Expense.deleteMany({});
    console.log('Cleared existing expenses');
    
    // Insert sample expenses
    await Expense.insertMany(sampleExpenses);
    console.log(`Seeded ${sampleExpenses.length} expenses`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

