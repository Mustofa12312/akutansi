import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

export interface Category {
    id: string;
    name: string;
    type: TransactionType;
    isDefault?: boolean;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: string;
    type: TransactionType;
    note: string;
}

export interface UserSettings {
    name: string;
    monthlyIncome: number;
    targetSavings: number;
}

export interface AppData {
    transactions: Transaction[];
    categories: Category[];
    settings: UserSettings;
}

interface TransactionState {
    transactions: Transaction[];
    categories: Category[];
    settings: UserSettings;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    updateSettings: (settings: Partial<UserSettings>) => void;
    addCategory: (category: Omit<Category, 'id'>) => void;
    deleteCategory: (id: string) => void;
    importData: (data: AppData) => void;
}

const DEFAULT_CATEGORIES: Category[] = [
    { id: '1', name: 'Food', type: 'expense', isDefault: true },
    { id: '2', name: 'Transport', type: 'expense', isDefault: true },
    { id: '3', name: 'Shopping', type: 'expense', isDefault: true },
    { id: '4', name: 'Utilities', type: 'expense', isDefault: true },
    { id: '5', name: 'Entertainment', type: 'expense', isDefault: true },
    { id: '6', name: 'Health', type: 'expense', isDefault: true },
    { id: '7', name: 'Others', type: 'expense', isDefault: true },
    { id: '8', name: 'Salary', type: 'income', isDefault: true },
    { id: '9', name: 'Freelance', type: 'income', isDefault: true },
    { id: '10', name: 'Bonus', type: 'income', isDefault: true },
    { id: '11', name: 'Investment', type: 'income', isDefault: true },
];

export const useTransactionStore = create<TransactionState>()(
    persist(
        (set) => ({
            transactions: [
                // Initial mock data for first-time Experience
                { id: '1', date: new Date().toISOString().split('T')[0], category: 'Food', amount: 45000, type: 'expense', note: 'Welcome Lunch' },
                { id: '2', date: new Date().toISOString().split('T')[0], category: 'Transport', amount: 15000, type: 'expense', note: 'Gojek' },
            ],
            categories: DEFAULT_CATEGORIES,
            settings: {
                name: 'User',
                monthlyIncome: 15000000,
                targetSavings: 5000000,
            },
            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        { id: crypto.randomUUID(), ...transaction },
                        ...state.transactions,
                    ],
                })),
            deleteTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                })),
            updateSettings: (newSettings) =>
                set((state) => ({
                    settings: { ...state.settings, ...newSettings },
                })),
            addCategory: (category) =>
                set((state) => ({
                    categories: [...state.categories, { id: crypto.randomUUID(), ...category }],
                })),
            deleteCategory: (id) =>
                set((state) => ({
                    categories: state.categories.filter((c) => c.id !== id),
                })),
            importData: (data) =>
                set(() => ({
                    transactions: data.transactions || [],
                    categories: data.categories || DEFAULT_CATEGORIES,
                    settings: data.settings || { name: 'User', monthlyIncome: 0, targetSavings: 0 },
                })),
        }),
        {
            name: 'finsmart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                transactions: state.transactions,
                categories: state.categories,
                settings: state.settings,
            }),
        }
    )
);
