import { Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function PeriodReport({ data }) {
  const maxAmount = Math.max(...data.map(item => item.total));

  const formatPeriod = (period) => {
    const [year, month] = period.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Calendar size={24} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expenses by Period</h3>
          <p className="text-sm text-gray-500">Monthly breakdown</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const heightPercentage = (item.total / maxAmount) * 100;
          return (
            <div key={item.period} className="flex items-end gap-4">
              <div className="w-24 text-sm font-medium text-gray-700">
                {formatPeriod(item.period)}
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden h-12 flex items-end">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 w-full transition-all duration-500 rounded-t-lg"
                    style={{ height: `${heightPercentage}%`, minHeight: '8px' }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-24 text-right">
                  {formatCurrency(item.total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

