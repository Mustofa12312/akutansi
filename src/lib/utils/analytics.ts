import { Transaction } from '@/lib/store/useTransactionStore';
import { format, subDays, endOfMonth, eachDayOfInterval } from 'date-fns';

export function getMonthlyChartData(transactions: Transaction[]) {
    // Get current date range (last 30 days or current month)
    // For simplicity, let's show last 30 days or current month days
    const today = new Date();
    const start = subDays(today, 30);

    const days = eachDayOfInterval({
        start: start,
        end: today
    });

    return days.map(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        const dayIncome = transactions
            .filter(t => t.type === 'income' && t.date === dayStr)
            .reduce((acc, t) => acc + t.amount, 0);

        const dayExpense = transactions
            .filter(t => t.type === 'expense' && t.date === dayStr)
            .reduce((acc, t) => acc + t.amount, 0);

        return {
            name: format(day, 'dd MMM'), // e.g. "12 Mar"
            income: dayIncome,
            expense: dayExpense
        };
    });
}

export function calculateDailyLimit(
    monthlyIncome: number,
    targetSavings: number,
    transactions: Transaction[]
) {
    const today = new Date();
    const end = endOfMonth(today);

    // Calculate days remaining in month including today
    const daysRemaining = Math.max(1, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    // Fixed Expenses (Needs a category 'Fixed' or similar, simplified for now: assume 0 or derived)
    // Logic: (Net Income - Target) / Days

    // Get total spent *this month*
    const currentMonth = format(today, 'yyyy-MM');
    const spentThisMonth = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
        .reduce((acc, t) => acc + t.amount, 0);

    // Simple formula: Available for spending = Income - Savings - Already Spent
    // Daily Limit = Available / Days Remaining

    const availableBudget = monthlyIncome - targetSavings - spentThisMonth;
    return Math.max(0, availableBudget / daysRemaining);
}
