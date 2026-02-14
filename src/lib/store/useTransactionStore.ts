import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

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

interface TransactionState {
    transactions: Transaction[];
    settings: UserSettings;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useTransactionStore = create<TransactionState>()(
    persist(
        (set) => ({
            transactions: [
                // Initial mock data for first-time Experience
                { id: '1', date: new Date().toISOString().split('T')[0], category: 'Food', amount: 45000, type: 'expense', note: 'Welcome Lunch' },
                { id: '2', date: new Date().toISOString().split('T')[0], category: 'Transport', amount: 15000, type: 'expense', note: 'Gojek' },
            ],
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
        }),
        {
            name: 'finsmart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
