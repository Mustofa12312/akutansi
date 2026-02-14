'use client';

import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';

export function SmartInsights() {
    const { transactions, settings } = useTransactionStore();
    const { t } = useTranslation();

    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');
    const todayStr = format(now, 'yyyy-MM-dd');

    const monthlyExpenses = transactions.filter(
        (tx) => tx.type === 'expense' && tx.date.startsWith(currentMonthStr)
    );

    const totalExpenses = monthlyExpenses.reduce((s, tx) => s + tx.amount, 0);
    const spentToday = transactions
        .filter((tx) => tx.type === 'expense' && tx.date === todayStr)
        .reduce((s, tx) => s + tx.amount, 0);

    // Top Category
    const categoryTotals: Record<string, number> = {};
    monthlyExpenses.forEach((tx) => {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
    });
    const topCategory = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
    )[0];

    // Daily Limit
    const spendingBudget = settings.monthlyIncome - settings.targetSavings;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);
    const remainingBudget = spendingBudget - totalExpenses;
    const dailyLimit = Math.max(0, remainingBudget / daysRemaining);
    const usagePercent = dailyLimit > 0 ? Math.round((spentToday / dailyLimit) * 100) : 0;
    const remainingPercent = Math.max(0, 100 - usagePercent);

    // Projections
    const dayOfMonth = now.getDate();
    const dailyAvg = dayOfMonth > 0 ? totalExpenses / dayOfMonth : 0;
    const projectedExpenses = dailyAvg * daysInMonth;
    const projectedSavings = settings.monthlyIncome - projectedExpenses;

    const insightText = topCategory
        ? t.insights.topCategoryMsg
            .replace('{category}', topCategory[0])
            .replace('{amount}', formatCurrency(topCategory[1]))
        : t.insights.noExpenseMsg;

    let limitText: string;
    if (spentToday > dailyLimit) {
        limitText = t.insights.overLimitMsg.replace('{percent}', String(usagePercent));
    } else if (usagePercent > 75) {
        limitText = t.insights.nearLimitMsg.replace('{percent}', String(remainingPercent));
    } else {
        limitText = t.insights.safeLimitMsg.replace('{amount}', formatCurrency(dailyLimit - spentToday));
    }

    const projectionText = projectedSavings > 0
        ? t.insights.positiveProjection.replace('{amount}', formatCurrency(projectedSavings))
        : t.insights.negativeProjection;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5" />
                    <h3 className="font-semibold">{t.insights.smartInsight}</h3>
                </div>
                <p className="text-sm text-purple-100">{insightText}</p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="font-semibold">{t.insights.limitStatus}</h3>
                </div>
                <p className="text-sm text-orange-100">{limitText}</p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-semibold">{t.insights.savingsProjection}</h3>
                </div>
                <p className="text-sm text-emerald-100">{projectionText}</p>
            </div>
        </div>
    );
}
