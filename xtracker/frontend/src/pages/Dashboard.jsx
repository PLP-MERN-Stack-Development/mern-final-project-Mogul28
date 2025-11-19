import { useMemo } from 'react';
import { DollarSign, TrendingUp, Receipt, Tag, Plus, Download, Filter, Calendar } from 'lucide-react';
import StatCard from '../components/StatCard';
import CategoryReport from '../components/CategoryReport';
import VendorReport from '../components/VendorReport';
import MonthlyBarChart from '../components/MonthlyBarChart';
import {
  calculateCategoryTotals,
  calculateVendorTotals,
  calculatePeriodTotals,
  formatCurrency
} from '../utils/calculations';

export default function Dashboard({ expenses, onAddExpense }) {
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

  const topCategory = useMemo(() => {
    if (categoryTotals.length === 0) return null;
    return categoryTotals[0];
  }, [categoryTotals]);

  const quickActions = [
    { icon: Plus, label: 'Add Expense', action: onAddExpense, color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Download, label: 'Export Data', action: () => alert('Export feature coming soon'), color: 'bg-green-600 hover:bg-green-700' },
    { icon: Filter, label: 'Filter Expenses', action: () => alert('Filter feature coming soon'), color: 'bg-orange-600 hover:bg-orange-700' },
    { icon: Calendar, label: 'View Calendar', action: () => alert('Calendar feature coming soon'), color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <StatCard
          icon={Tag}
          label="Top Category"
          value={topCategory ? topCategory.category : 'N/A'}
          color="bg-purple-600"
        />
      </div>

      {/* Charts Row - 3 cards with equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CategoryReport data={categoryTotals} />
        <VendorReport data={vendorTotals} />
        <MonthlyBarChart data={periodTotals} />
      </div>

      {/* Quick Actions Row - Full Width */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-500">Common tasks and shortcuts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white rounded-xl p-6 flex flex-col items-center gap-3 transition-colors shadow-sm hover:shadow-md`}
              >
                <Icon size={24} />
                <span className="font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

