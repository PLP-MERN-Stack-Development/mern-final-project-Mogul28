import { PieChart } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function CategoryReport({ data }) {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col max-h-[400px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <PieChart size={24} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expenses by Category</h3>
          <p className="text-sm text-gray-500">Total: {formatCurrency(total)}</p>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        {data.map((item, index) => {
          const percentage = ((item.total / total) * 100).toFixed(1);
          return (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.total)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${colors[index % colors.length]} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500 w-12 text-right">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

