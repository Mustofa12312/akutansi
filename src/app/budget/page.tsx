'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, cn } from '@/lib/utils';
import { Target, TrendingUp, TrendingDown, PiggyBank, Wallet } from 'lucide-react';
import { format } from 'date-fns';

export default function BudgetPage() {
    const { transactions, settings } = useTransactionStore();
    const { t } = useTranslation();
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

    const monthlyIncome = transactions
        .filter(tx => tx.type === 'income' && tx.date.startsWith(currentMonthStr))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const monthlyExpense = transactions
        .filter(tx => tx.type === 'expense' && tx.date.startsWith(currentMonthStr))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const spendingBudget = settings.monthlyIncome - settings.targetSavings;
    const budgetUsed = (monthlyExpense / spendingBudget) * 100;
    const savingsProgress = monthlyIncome > 0
        ? Math.min(((monthlyIncome - monthlyExpense) / settings.targetSavings) * 100, 100)
        : 0;

    const categoryMap: Record<string, number> = {};
    transactions
        .filter(tx => tx.type === 'expense' && tx.date.startsWith(currentMonthStr))
        .forEach(tx => {
            categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
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
                <h2 className="text-3xl font-bold tracking-tight">{t.budget.title}</h2>
                <p className="text-muted-foreground">{t.budget.subtitle}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.budget.monthlyBudget}</CardTitle>
                        <Wallet className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(spendingBudget)}</div>
                        <p className="text-xs text-muted-foreground">{t.budget.incomeSavings}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.budget.spentThisMonth}</CardTitle>
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(monthlyExpense)}</div>
                        <p className={cn("text-xs", budgetUsed > 80 ? "text-rose-500" : "text-emerald-500")}>
                            {t.budget.budgetUsed.replace('{percent}', String(Math.round(budgetUsed)))}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.budget.remainingBudget}</CardTitle>
                        <Target className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", (spendingBudget - monthlyExpense) < 0 ? "text-rose-500" : "")}>
                            {formatCurrency(Math.max(spendingBudget - monthlyExpense, 0))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {t.budget.daysRemaining.replace('{days}', String(daysRemaining))}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.budget.savingsProgress}</CardTitle>
                        <PiggyBank className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.round(savingsProgress)}%</div>
                        <p className="text-xs text-muted-foreground">
                            {t.budget.ofTarget.replace('{target}', formatCurrency(settings.targetSavings))}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t.budget.monthlyBudgetUsage}</CardTitle>
                    <CardDescription>
                        {t.budget.spentOfBudget
                            .replace('{spent}', formatCurrency(monthlyExpense))
                            .replace('{budget}', formatCurrency(spendingBudget))
                            .replace('{percent}', String(Math.round(budgetUsed)))}
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

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle>{t.budget.savingsGoalTitle}</CardTitle>
                            <CardDescription>
                                {t.budget.savingsGoalTarget.replace('{target}', formatCurrency(settings.targetSavings))}
                            </CardDescription>
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
                            ? t.budget.savingsGoalReached
                            : t.budget.savingsGoalRemaining.replace('{amount}', formatCurrency(Math.max(settings.targetSavings - (monthlyIncome - monthlyExpense), 0)))}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t.budget.spendingByCategory}</CardTitle>
                    <CardDescription>{t.budget.whereMoneyGoes}</CardDescription>
                </CardHeader>
                <CardContent>
                    {categories.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">{t.budget.noExpenses}</p>
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
