'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, cn } from '@/lib/utils';
import { Target, TrendingUp, TrendingDown, PiggyBank, Wallet } from 'lucide-react';
import { format } from 'date-fns';

export default function BudgetPage() {
    const { transactions, settings } = useTransactionStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysPassed = now.getDate();
    const daysRemaining = daysInMonth - daysPassed;

    // Monthly calculations
    const monthlyIncome = transactions
        .filter(t => t.type === 'income' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);

    const monthlyExpense = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);

    const spendingBudget = settings.monthlyIncome - settings.targetSavings;
    const budgetUsed = (monthlyExpense / spendingBudget) * 100;
    const savingsProgress = monthlyIncome > 0
        ? Math.min(((monthlyIncome - monthlyExpense) / settings.targetSavings) * 100, 100)
        : 0;

    // Category breakdown
    const categoryMap: Record<string, number> = {};
    transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .forEach(t => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

    const categories = Object.entries(categoryMap)
        .sort(([, a], [, b]) => b - a)
        .map(([name, amount]) => ({
            name,
            amount,
            percentage: (amount / Math.max(monthlyExpense, 1)) * 100,
        }));

    const categoryColors: Record<string, string> = {
        Food: 'bg-orange-500',
        Transport: 'bg-blue-500',
        Shopping: 'bg-pink-500',
        Utilities: 'bg-yellow-500',
        Entertainment: 'bg-purple-500',
        Health: 'bg-red-500',
        Others: 'bg-gray-500',
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Budget & Goals</h2>
                <p className="text-muted-foreground">
                    Track your monthly budget and savings goals.
                </p>
            </div>

            {/* Budget Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                        <Wallet className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(spendingBudget)}</div>
                        <p className="text-xs text-muted-foreground">Income − Savings Target</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Spent This Month</CardTitle>
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(monthlyExpense)}</div>
                        <p className={cn("text-xs", budgetUsed > 80 ? "text-rose-500" : "text-emerald-500")}>
                            {Math.round(budgetUsed)}% of budget used
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
                        <Target className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", (spendingBudget - monthlyExpense) < 0 ? "text-rose-500" : "")}>
                            {formatCurrency(Math.max(spendingBudget - monthlyExpense, 0))}
                        </div>
                        <p className="text-xs text-muted-foreground">{daysRemaining} days remaining</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Savings Progress</CardTitle>
                        <PiggyBank className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.round(savingsProgress)}%</div>
                        <p className="text-xs text-muted-foreground">of {formatCurrency(settings.targetSavings)} target</p>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Progress Bar */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Budget Usage</CardTitle>
                    <CardDescription>
                        {formatCurrency(monthlyExpense)} of {formatCurrency(spendingBudget)} spent ({Math.round(budgetUsed)}%)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress
                        value={Math.min(budgetUsed, 100)}
                        className="h-4"
                        indicatorClassName={budgetUsed > 90 ? 'bg-rose-500' : budgetUsed > 70 ? 'bg-amber-500' : 'bg-emerald-500'}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Rp 0</span>
                        <span>{formatCurrency(spendingBudget)}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Savings Goal */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle>Savings Goal</CardTitle>
                            <CardDescription>Target: {formatCurrency(settings.targetSavings)} / month</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress
                        value={savingsProgress}
                        className="h-3"
                        indicatorClassName="bg-emerald-500"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                        {savingsProgress >= 100
                            ? '🎉 Congratulations! You have reached your savings goal!'
                            : `You need ${formatCurrency(Math.max(settings.targetSavings - (monthlyIncome - monthlyExpense), 0))} more to reach your goal.`}
                    </p>
                </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Where your money goes this month</CardDescription>
                </CardHeader>
                <CardContent>
                    {categories.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">No expenses recorded this month.</p>
                    ) : (
                        <div className="space-y-4">
                            {categories.map(cat => (
                                <div key={cat.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{cat.name}</span>
                                        <span className="text-muted-foreground">{formatCurrency(cat.amount)} ({Math.round(cat.percentage)}%)</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all", categoryColors[cat.name] || 'bg-gray-500')}
                                            style={{ width: `${cat.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
