'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Receipt,
    PieChart,
    Settings,
    CreditCard,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { format } from 'date-fns';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Budget & Goals', href: '/budget', icon: Target },
    { name: 'Analytics', href: '/analytics', icon: PieChart },
    { name: 'Cards', href: '/cards', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { transactions, settings } = useTransactionStore();

    // Live daily limit calculation for sidebar widget
    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');
    const todayStr = format(now, 'yyyy-MM-dd');

    const spendingBudget = settings.monthlyIncome - settings.targetSavings;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);

    const expensesThisMonth = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);

    const remainingBudget = spendingBudget - expensesThisMonth;
    const dailyLimit = Math.max(0, remainingBudget / daysRemaining);

    const spentToday = transactions
        .filter(t => t.date === todayStr && t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const usagePercent = dailyLimit > 0 ? Math.min((spentToday / dailyLimit) * 100, 100) : 0;

    let statusText = 'Safe Zone';
    let barColor = 'bg-white';
    if (usagePercent > 90) {
        statusText = 'Over Limit!';
        barColor = 'bg-rose-300';
    } else if (usagePercent > 70) {
        statusText = 'Warning';
        barColor = 'bg-amber-300';
    }

    return (
        <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-full">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    MustofaFinal
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 text-white">
                    <p className="text-xs font-medium opacity-90">Daily Limit Status</p>
                    <div className="mt-2 text-lg font-bold">{statusText}</div>
                    <div className="mt-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all", barColor)} style={{ width: `${usagePercent}%` }} />
                    </div>
                </div>
            </div>
        </aside>
    );
}
