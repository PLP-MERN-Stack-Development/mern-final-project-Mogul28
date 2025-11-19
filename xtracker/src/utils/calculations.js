export const calculateCategoryTotals = (expenses) => {
  const totals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
};

export const calculateVendorTotals = (expenses) => {
  const totals = expenses.reduce((acc, expense) => {
    acc[expense.vendor] = (acc[expense.vendor] || 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([vendor, total]) => ({ vendor, total }))
    .sort((a, b) => b.total - a.total);
};

export const calculatePeriodTotals = (expenses) => {
  const totals = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[period] = (acc[period] || 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([period, total]) => ({ period, total }))
    .sort((a, b) => b.period.localeCompare(a.period));
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

