'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');

    // Monthly totals
    const monthlyIncome = transactions
        .filter(t => t.type === 'income' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);

    const monthlyExpense = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);

    const netFlow = monthlyIncome - monthlyExpense;

    // Daily spending trend (last 14 days)
    const days14 = eachDayOfInterval({ start: subDays(now, 13), end: now });
    const dailyTrend = days14.map(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        const expense = transactions
            .filter(t => t.type === 'expense' && t.date === dayStr)
            .reduce((acc, t) => acc + t.amount, 0);
        const income = transactions
            .filter(t => t.type === 'income' && t.date === dayStr)
            .reduce((acc, t) => acc + t.amount, 0);
        return {
            name: format(day, 'dd MMM'),
            expense,
            income,
        };
    });

    // Category pie data
    const categoryMap: Record<string, number> = {};
    transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .forEach(t => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });
    const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    // Top spending days
    const daySpendingMap: Record<string, number> = {};
    transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .forEach(t => {
            daySpendingMap[t.date] = (daySpendingMap[t.date] || 0) + t.amount;
        });
    const topDays = Object.entries(daySpendingMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([date, amount]) => ({ date: format(new Date(date), 'dd MMM yyyy'), amount }));

    // Average daily spending
    const totalDays = Object.keys(daySpendingMap).length || 1;
    const avgDaily = monthlyExpense / totalDays;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                <p className="text-muted-foreground">
                    Deep insights into your financial patterns.
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{formatCurrency(monthlyIncome)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-rose-500">{formatCurrency(monthlyExpense)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
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
                        <CardTitle className="text-sm font-medium">Avg. Daily Spending</CardTitle>
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(avgDaily)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Income vs Expense Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Daily Trend (Last 14 Days)</CardTitle>
                    <CardDescription>Income vs Expenses comparison</CardDescription>
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
                {/* Category Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Expense Categories</CardTitle>
                        <CardDescription>Distribution of spending</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pieData.length === 0 ? (
                            <p className="text-center py-12 text-muted-foreground">No expense data this month.</p>
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

                {/* Top Spending Days */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Spending Days</CardTitle>
                        <CardDescription>Your highest spending days this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topDays.length === 0 ? (
                            <p className="text-center py-12 text-muted-foreground">No data yet.</p>
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
