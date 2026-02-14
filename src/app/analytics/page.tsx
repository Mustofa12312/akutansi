'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency, cn } from '@/lib/utils';
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#6b7280'];

export default function AnalyticsPage() {
    const { transactions } = useTransactionStore();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');

    const monthlyIncome = transactions
        .filter(tx => tx.type === 'income' && tx.date.startsWith(currentMonthStr))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const monthlyExpense = transactions
        .filter(tx => tx.type === 'expense' && tx.date.startsWith(currentMonthStr))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const netFlow = monthlyIncome - monthlyExpense;

    const days14 = eachDayOfInterval({ start: subDays(now, 13), end: now });
    const dailyTrend = days14.map(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        const expense = transactions
            .filter(tx => tx.type === 'expense' && tx.date === dayStr)
            .reduce((acc, tx) => acc + tx.amount, 0);
        const income = transactions
            .filter(tx => tx.type === 'income' && tx.date === dayStr)
            .reduce((acc, tx) => acc + tx.amount, 0);
        return { name: format(day, 'dd MMM'), expense, income };
    });

    const categoryMap: Record<string, number> = {};
    transactions
        .filter(tx => tx.type === 'expense' && tx.date.startsWith(currentMonthStr))
        .forEach(tx => {
            categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
        });
    const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    const daySpendingMap: Record<string, number> = {};
    transactions
        .filter(tx => tx.type === 'expense' && tx.date.startsWith(currentMonthStr))
        .forEach(tx => {
            daySpendingMap[tx.date] = (daySpendingMap[tx.date] || 0) + tx.amount;
        });
    const topDays = Object.entries(daySpendingMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([date, amount]) => ({ date: format(new Date(date), 'dd MMM yyyy'), amount }));

    const totalDays = Object.keys(daySpendingMap).length || 1;
    const avgDaily = monthlyExpense / totalDays;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t.analyticsPage.title}</h2>
                <p className="text-muted-foreground">{t.analyticsPage.subtitle}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.analyticsPage.monthlyIncome}</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{formatCurrency(monthlyIncome)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.analyticsPage.monthlyExpenses}</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-rose-500">{formatCurrency(monthlyExpense)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.analyticsPage.netCashFlow}</CardTitle>
                        {netFlow >= 0 ? <TrendingUp className="h-4 w-4 text-emerald-500" /> : <TrendingDown className="h-4 w-4 text-rose-500" />}
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", netFlow >= 0 ? "text-emerald-600" : "text-rose-500")}>
                            {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t.analyticsPage.avgDailySpending}</CardTitle>
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(avgDaily)}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t.analyticsPage.dailyTrend}</CardTitle>
                    <CardDescription>{t.analyticsPage.incomeVsExpenses}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dailyTrend}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(value: any) => [formatCurrency(Number(value))]}
                                />
                                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.analyticsPage.expenseCategories}</CardTitle>
                        <CardDescription>{t.analyticsPage.distribution}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pieData.length === 0 ? (
                            <p className="text-center py-12 text-muted-foreground">{t.analyticsPage.noExpenseData}</p>
                        ) : (
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            dataKey="value"
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        >
                                            {pieData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        <Tooltip formatter={(value: any) => [formatCurrency(Number(value))]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t.analyticsPage.topSpendingDays}</CardTitle>
                        <CardDescription>{t.analyticsPage.highestSpending}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topDays.length === 0 ? (
                            <p className="text-center py-12 text-muted-foreground">{t.analyticsPage.noData}</p>
                        ) : (
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topDays} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                        <YAxis type="category" dataKey="date" fontSize={11} width={90} />
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        <Tooltip formatter={(value: any) => [formatCurrency(Number(value))]} />
                                        <Bar dataKey="amount" fill="#10b981" radius={[0, 6, 6, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
