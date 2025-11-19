import { Wallet, Plus } from 'lucide-react';

export default function Header({ onAddExpense }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Wallet size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ExpenseTracker</h1>
          </div>

          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Plus size={20} />
            Add Expense
          </button>
        </div>
      </div>
    </header>
  );
}

