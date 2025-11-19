import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Receipt } from 'lucide-react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryReport from './components/CategoryReport';
import PeriodReport from './components/PeriodReport';
import VendorReport from './components/VendorReport';
import { sampleExpenses } from './utils/sampleData';
import {
  calculateCategoryTotals,
  calculateVendorTotals,
  calculatePeriodTotals,
  formatCurrency
} from './utils/calculations';

function App() {
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [showForm, setShowForm] = useState(false);

  const handleAddExpense = (newExpense) => {
    const expense = {
      ...newExpense,
      id: Date.now().toString()
    };
    setExpenses([expense, ...expenses]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const categoryTotals = useMemo(() => calculateCategoryTotals(expenses), [expenses]);
  const vendorTotals = useMemo(() => calculateVendorTotals(expenses), [expenses]);
  const periodTotals = useMemo(() => calculatePeriodTotals(expenses), [expenses]);

  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return expenses.filter(exp => exp.date.startsWith(currentMonth))
      .reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddExpense={() => setShowForm(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Total Expenses"
            value={formatCurrency(totalExpenses)}
            color="bg-blue-600"
          />
          <StatCard
            icon={TrendingUp}
            label="This Month"
            value={formatCurrency(currentMonthExpenses)}
            color="bg-green-600"
          />
          <StatCard
            icon={Receipt}
            label="Total Transactions"
            value={expenses.length.toString()}
            color="bg-orange-600"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h2>
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryReport data={categoryTotals} />
          <VendorReport data={vendorTotals} />
        </div>

        <div className="mt-6">
          <PeriodReport data={periodTotals} />
        </div>
      </main>

      {showForm && (
        <ExpenseForm
          onAddExpense={handleAddExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;

