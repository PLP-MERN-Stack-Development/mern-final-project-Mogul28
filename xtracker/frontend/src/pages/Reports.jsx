import { useMemo } from 'react';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';
import CategoryReport from '../components/CategoryReport';
import VendorReport from '../components/VendorReport';
import {
  calculateCategoryTotals,
  calculateVendorTotals,
  formatCurrency
} from '../utils/calculations';

export default function Reports({ expenses }) {
  const categoryTotals = useMemo(() => calculateCategoryTotals(expenses), [expenses]);
  const vendorTotals = useMemo(() => calculateVendorTotals(expenses), [expenses]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const averageExpense = useMemo(() => {
    if (expenses.length === 0) return 0;
    return totalExpenses / expenses.length;
  }, [expenses, totalExpenses]);

  const highestExpense = useMemo(() => {
    if (expenses.length === 0) return null;
    return expenses.reduce((max, exp) => (exp.amount > max.amount ? exp : max), expenses[0]);
  }, [expenses]);

  const lowestExpense = useMemo(() => {
    if (expenses.length === 0) return null;
    return expenses.reduce((min, exp) => (exp.amount < min.amount ? exp : min), expenses[0]);
  }, [expenses]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reports & Analytics</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Spent</span>
              <DollarSign size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Average Expense</span>
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageExpense)}</p>
          </div>

          {highestExpense && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Highest Expense</span>
                <TrendingUp size={20} className="text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(highestExpense.amount)}</p>
              <p className="text-xs text-gray-500 mt-1">{highestExpense.description}</p>
            </div>
          )}

          {lowestExpense && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Lowest Expense</span>
                <TrendingDown size={20} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(lowestExpense.amount)}</p>
              <p className="text-xs text-gray-500 mt-1">{lowestExpense.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryReport data={categoryTotals} />
        <VendorReport data={vendorTotals} />
      </div>
    </div>
  );
}

