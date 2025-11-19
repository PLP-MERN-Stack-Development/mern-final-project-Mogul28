import { sampleExpenses, categories } from './sampleData.js';

// API base URL - use environment variable or default to localhost for development
// In development, we can use the Vite proxy by using relative URLs
// In production, use the full API URL from environment variable
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? '' : 'http://localhost:3000');

// Flag to use mock data when backend is not available
const USE_MOCK_DATA = false; // Set to false when backend is ready

// Local storage keys
const STORAGE_KEY = 'xtracker_expenses';
const TOKEN_KEY = 'xtracker_token';
const USER_KEY = 'xtracker_user';

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Mock data storage (in-memory)
let mockExpenses = [];

// Initialize mock data from localStorage or sample data
function initializeMockData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      mockExpenses = JSON.parse(stored);
    } catch (e) {
      mockExpenses = [...sampleExpenses];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockExpenses));
    }
  } else {
    mockExpenses = [...sampleExpenses];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockExpenses));
  }
}

// Initialize on module load
initializeMockData();

// Helper function to handle API requests with fallback to mock data
async function apiRequest(endpoint, options = {}) {
  // If using mock data, handle requests locally
  if (USE_MOCK_DATA) {
    return handleMockRequest(endpoint, options);
  }

  // Use relative URL in development (Vite proxy) or full URL in production
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      // Clear auth data and throw error (don't fall back to mock data)
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      const error = new Error('Session expired. Please login again.');
      error.status = 401;
      throw error;
    }
    
    if (!response.ok) {
      // Fallback to mock data on error (except 401)
      console.warn('Backend request failed, using mock data');
      return handleMockRequest(endpoint, options);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    // Don't fall back to mock data for 401 errors - let them propagate
    if (error.status === 401 || error.message.includes('Session expired')) {
      throw error;
    }
    
    // Fallback to mock data on connection error (but not auth errors)
    console.warn('Backend connection failed, using mock data:', error.message);
    return handleMockRequest(endpoint, options);
  }
}

// Handle mock requests (localStorage-based)
function handleMockRequest(endpoint, options = {}) {
  // Reload from localStorage to get latest data
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      mockExpenses = JSON.parse(stored);
    } catch (e) {
      mockExpenses = [...sampleExpenses];
    }
  }

  const method = options.method || 'GET';

  // GET /api/expenses
  if (endpoint === '/api/expenses' && method === 'GET') {
    return Promise.resolve([...mockExpenses]);
  }

  // GET /api/expenses/:id
  if (endpoint.startsWith('/api/expenses/') && method === 'GET') {
    const id = endpoint.split('/').pop();
    const expense = mockExpenses.find(exp => exp.id === id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return Promise.resolve({ ...expense });
  }

  // POST /api/expenses
  if (endpoint === '/api/expenses' && method === 'POST') {
    const newExpense = {
      ...options.body,
      id: Date.now().toString(),
      amount: parseFloat(options.body.amount)
    };
    mockExpenses.unshift(newExpense);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockExpenses));
    return Promise.resolve(newExpense);
  }

  // PUT /api/expenses/:id
  if (endpoint.startsWith('/api/expenses/') && method === 'PUT') {
    const id = endpoint.split('/').pop();
    const index = mockExpenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }
    mockExpenses[index] = {
      ...mockExpenses[index],
      ...options.body,
      amount: parseFloat(options.body.amount || mockExpenses[index].amount)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockExpenses));
    return Promise.resolve(mockExpenses[index]);
  }

  // DELETE /api/expenses/:id
  if (endpoint.startsWith('/api/expenses/') && method === 'DELETE') {
    const id = endpoint.split('/').pop();
    const index = mockExpenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }
    mockExpenses.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockExpenses));
    return Promise.resolve(null);
  }

  // GET /api/categories
  if (endpoint === '/api/categories' && method === 'GET') {
    return Promise.resolve([...categories]);
  }

  throw new Error(`Unknown endpoint: ${endpoint}`);
}

// Expense API methods
export const expenseAPI = {
  // Get all expenses
  getAll: () => apiRequest('/api/expenses'),

  // Get expense by ID
  getById: (id) => apiRequest(`/api/expenses/${id}`),

  // Create new expense
  create: (expense) => apiRequest('/api/expenses', {
    method: 'POST',
    body: expense,
  }),

  // Update expense
  update: (id, expense) => apiRequest(`/api/expenses/${id}`, {
    method: 'PUT',
    body: expense,
  }),

  // Delete expense
  delete: (id) => apiRequest(`/api/expenses/${id}`, {
    method: 'DELETE',
  }),
};

// Categories API
export const categoryAPI = {
  getAll: () => apiRequest('/api/categories'),
};

// Auth API
export const authAPI = {
  // Signup
  signup: async (userData) => {
    const url = API_BASE_URL ? `${API_BASE_URL}/api/auth/signup` : '/api/auth/signup';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const data = await response.json();
    // Store token and user data
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    return data;
  },

  // Login
  login: async (credentials) => {
    const url = API_BASE_URL ? `${API_BASE_URL}/api/auth/login` : '/api/auth/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    // Store token and user data
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getToken();
  },
};
