'use client';

import { useEffect, useState } from 'react';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { DailyLimitCard } from '@/components/dashboard/DailyLimitCard';
import { OverviewChart } from '@/components/dashboard/OverviewChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { SmartInsights } from '@/components/dashboard/SmartInsights';
import { FloatingAddButton } from '@/components/layout/FloatingAddButton';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { getMonthlyChartData } from '@/lib/utils/analytics';
import { format } from 'date-fns';

export default function DashboardPage() {
    const { transactions, settings } = useTransactionStore();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Real data calculations
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    // Daily Limit Logic
    const spendingBudget = settings.monthlyIncome - settings.targetSavings;
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);
    const currentMonthStr = format(now, 'yyyy-MM');
    const expensesThisMonth = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);
    const remainingBudget = spendingBudget - expensesThisMonth;
    const dailyLimit = Math.max(0, remainingBudget / daysRemaining);

    // Spent Today
    const todayStr = format(now, 'yyyy-MM-dd');
    const spentToday = transactions
        .filter(t => t.date === todayStr && t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    // Chart Data
    const chartData = getMonthlyChartData(transactions);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t.dashboard.title}</h2>
                    <p className="text-muted-foreground">
                        {t.dashboard.greeting.replace('{name}', settings.name)}
                    </p>
                </div>
            </div>

            <SummaryCards
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                balance={balance}
                savingsTarget={settings.targetSavings}
            />

            <SmartInsights />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 lg:col-span-4">
                    <OverviewChart data={chartData} />
                </div>
                <div className="col-span-4 lg:col-span-3">
                    <DailyLimitCard limit={dailyLimit} spent={spentToday} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentTransactions transactions={transactions.slice(0, 5)} />
            </div>

            <FloatingAddButton />
        </div>
    );
}
