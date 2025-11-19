import { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Expenses from './pages/Expenses.jsx';
import Reports from './pages/Reports.jsx';
import MyAccount from './pages/MyAccount.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import { expenseAPI, authAPI } from './utils/api.js';

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const savedUser = authAPI.getCurrentUser();
    if (savedUser && authAPI.isAuthenticated()) {
      setUser(savedUser);
      setLoading(false);
    } else {
      // Clear any invalid auth data
      authAPI.logout();
      setLoading(false);
    }
  }, []);

  // Fetch expenses when user is logged in
  useEffect(() => {
    if (user && authAPI.isAuthenticated()) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseAPI.getAll();
      setExpenses(data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      
      // If unauthorized, logout user immediately
      if (err.message && (err.message.includes('Session expired') || err.message.includes('401') || err.status === 401)) {
        handleLogout();
        return; // Exit early, user will be redirected to login
      }
      
      const errorMessage = err.message || 'Failed to load expenses. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setExpenses([]);
    setCurrentPage('dashboard');
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const expense = await expenseAPI.create(newExpense);
      setExpenses([expense, ...expenses]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add expense:', err);
      alert('Failed to add expense. Please try again.');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await expenseAPI.delete(id);
      setExpenses(expenses.filter(exp => exp.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
      alert('Failed to delete expense. Please try again.');
    }
  };

  // Show login screen if not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading expenses...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    const isConnectionError = error.includes('Cannot connect to backend') || error.includes('backend server');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          {isConnectionError && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-left">
              <p className="text-sm text-blue-900 font-medium mb-2">To fix this:</p>
              <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
                <li>Open a new terminal</li>
                <li>Navigate to the backend folder: <code className="bg-blue-100 px-1 rounded">cd backend</code></li>
                <li>Install dependencies: <code className="bg-blue-100 px-1 rounded">npm install</code></li>
                <li>Start the server: <code className="bg-blue-100 px-1 rounded">npm start</code></li>
              </ol>
            </div>
          )}
          <button
            onClick={fetchExpenses}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard expenses={expenses} onAddExpense={() => setShowForm(true)} />;
      case 'expenses':
        return <Expenses expenses={expenses} onDeleteExpense={handleDeleteExpense} />;
      case 'reports':
        return <Reports expenses={expenses} />;
      case 'account':
        return <MyAccount user={user} />;
      default:
        return <Dashboard expenses={expenses} onAddExpense={() => setShowForm(true)} />;
    }
  };

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        onAddExpense={() => setShowForm(true)}
        user={user}
      >
        {renderPage()}
      </Layout>

      {showForm && (
        <ExpenseForm
          onAddExpense={handleAddExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}

export default App;
