import { Building2 } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function VendorReport({ data }) {
  const total = data.reduce((sum, item) => sum + item.total, 0);
  const topVendors = data.slice(0, 8);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col max-h-[400px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Building2 size={24} className="text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expenses by Vendor</h3>
          <p className="text-sm text-gray-500">Top spending destinations</p>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        {topVendors.map((item, index) => {
          const percentage = ((item.total / total) * 100).toFixed(1);
          return (
            <div
              key={item.vendor}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.vendor}</p>
                  <p className="text-xs text-gray-500">{percentage}% of total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(item.total)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

