'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Target, BarChart3, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransactionStore } from "@/lib/store/useTransactionStore";
import { useTranslation } from "@/lib/i18n";
import { format } from 'date-fns';

export function Sidebar() {
    const pathname = usePathname();
    const { transactions, settings } = useTransactionStore();
    const { t } = useTranslation();

    const navItems = [
        { href: "/", label: t.nav.dashboard, icon: LayoutDashboard },
        { href: "/transactions", label: t.nav.transactions, icon: ArrowLeftRight },
        { href: "/budget", label: t.nav.budgetGoals, icon: Target },
        { href: "/analytics", label: t.nav.analytics, icon: BarChart3 },
        { href: "/cards", label: t.nav.cards, icon: CreditCard },
        { href: "/settings", label: t.nav.settings, icon: Settings },
    ];

    // Daily limit calculation for sidebar widget
    const spendingBudget = settings.monthlyIncome - settings.targetSavings;
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);
    const currentMonthStr = format(now, 'yyyy-MM');
    const expensesThisMonth = transactions
        .filter((t) => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);
    const remainingBudget = spendingBudget - expensesThisMonth;
    const dailyLimit = Math.max(0, remainingBudget / daysRemaining);
    const todayStr = format(now, 'yyyy-MM-dd');
    const spentToday = transactions
        .filter((tx) => tx.date === todayStr && tx.type === 'expense')
        .reduce((acc, tx) => acc + tx.amount, 0);
    const usagePercent = dailyLimit > 0 ? Math.min((spentToday / dailyLimit) * 100, 100) : 0;

    let statusLabel: string = t.sidebar.safeZone;
    let statusColor = 'bg-emerald-500';
    if (spentToday > dailyLimit) {
        statusLabel = t.sidebar.overLimit;
        statusColor = 'bg-rose-500';
    } else if (usagePercent > 75) {
        statusLabel = t.sidebar.warning;
        statusColor = 'bg-amber-500';
    }

    return (
        <aside className="w-[200px] border-r border-border bg-background flex flex-col h-full shrink-0">
            <div className="p-6">
                <h1 className="text-xl font-bold text-primary">{t.appName}</h1>
            </div>
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            {/* Daily limit status widget */}
            <div className={cn("m-3 p-4 rounded-xl text-white", statusColor)}>
                <p className="text-xs font-semibold opacity-80">{t.sidebar.dailyLimitStatus}</p>
                <p className="text-lg font-bold">{statusLabel}</p>
                <div className="mt-2 h-1.5 bg-white/30 rounded-full">
                    <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${usagePercent}%` }}
                    />
                </div>
            </div>
        </aside>
    );
}
