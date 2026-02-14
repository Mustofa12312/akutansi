export const MOCK_USER = {
    name: "Alex",
    email: "alex@example.com",
    targetSavings: 5000000, // 5 Juta
    monthlyIncome: 15000000, // 15 Juta
};

export const MOCK_TRANSACTIONS = [
    { id: 1, date: '2024-03-10', category: 'Food', amount: 45000, type: 'expense', note: 'Lunch' },
    { id: 2, date: '2024-03-10', category: 'Transport', amount: 15000, type: 'expense', note: 'Gojek' },
    { id: 3, date: '2024-03-09', category: 'Freelance', amount: 2500000, type: 'income', note: 'Project UI Design' },
    { id: 4, date: '2024-03-08', category: 'Groceries', amount: 350000, type: 'expense', note: 'Weekly groceries' },
    { id: 5, date: '2024-03-07', category: 'Utilities', amount: 500000, type: 'expense', note: 'Electricity bill' },
];

// Data for charts
export const MONTHLY_OVERVIEW_DATA = [
    { name: '1', income: 15000000, expense: 8000000 },
    { name: '5', income: 0, expense: 500000 },
    { name: '10', income: 2500000, expense: 1200000 },
    { name: '15', income: 0, expense: 2000000 },
    { name: '20', income: 0, expense: 1500000 },
    { name: '25', income: 15000000, expense: 5000000 },
    { name: '30', income: 1000000, expense: 3000000 },
];

export const CATEGORY_DISTRIBUTION = [
    { name: 'Food', value: 35 },
    { name: 'Transport', value: 15 },
    { name: 'Utilities', value: 20 },
    { name: 'Shopping', value: 10 },
    { name: 'Savings', value: 20 },
];
