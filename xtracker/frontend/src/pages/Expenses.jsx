import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ExpenseList from '../components/ExpenseList';

export default function Expenses({ expenses, onDeleteExpense }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const filteredExpenses = expenses.filter(expense => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      expense.description.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      expense.vendor.toLowerCase().includes(query) ||
      expense.amount.toString().includes(query)
    );
  });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          <Filter size={20} />
          Filter
        </button>
      </div>

      {showFilter && (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Filter options coming soon...</p>
        </div>
      )}

      <ExpenseList expenses={filteredExpenses} onDeleteExpense={onDeleteExpense} />
    </div>
  );
}

