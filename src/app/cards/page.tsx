'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, Wifi, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';

export default function CardsPage() {
    const { transactions, settings } = useTransactionStore();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [showBalance, setShowBalance] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const totalIncome = transactions
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + tx.amount, 0);
    const totalExpense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + tx.amount, 0);
    const balance = totalIncome - totalExpense;

    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');
    const monthlyExpense = transactions
        .filter(tx => tx.type === 'expense' && tx.date.startsWith(currentMonthStr))
        .reduce((acc, tx) => acc + tx.amount, 0);

    const handleCopy = () => {
        navigator.clipboard.writeText('4832 •••• •••• 7621');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t.cardsPage.title}</h2>
                <p className="text-muted-foreground">{t.cardsPage.subtitle}</p>
            </div>

            {/* Virtual Card */}
            <div className="max-w-md">
                <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium opacity-90">{t.appName}</span>
                            <div className="flex items-center gap-2">
                                <Wifi className="h-5 w-5 opacity-80 rotate-90" />
                                <CreditCard className="h-6 w-6" />
                            </div>
                        </div>

                        <div>
                            <p className="text-xs opacity-70 mb-1">{t.cardsPage.currentBalance}</p>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold tracking-wider">
                                    {showBalance ? formatCurrency(balance) : '••••••••'}
                                </span>
                                <button onClick={() => setShowBalance(!showBalance)} className="opacity-70 hover:opacity-100 transition-opacity">
                                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg tracking-[0.3em] font-mono">4832 •••• •••• 7621</span>
                                <button onClick={handleCopy} className="opacity-70 hover:opacity-100 transition-opacity">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs opacity-70">{t.cardsPage.cardHolder}</p>
                                <p className="font-medium">{settings.name}</p>
                            </div>
                            <div>
                                <p className="text-xs opacity-70">{t.cardsPage.expires}</p>
                                <p className="font-medium">12/28</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{t.cardsPage.totalBalance}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
                        <p className="text-xs text-muted-foreground">{t.cardsPage.acrossAccounts}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{t.cardsPage.monthlySpending}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-rose-500">{formatCurrency(monthlyExpense)}</div>
                        <p className="text-xs text-muted-foreground">{t.cardsPage.thisMonth}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{t.cardsPage.monthlyLimit}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(settings.monthlyIncome - settings.targetSavings)}</div>
                        <p className="text-xs text-muted-foreground">{t.cardsPage.safeSpending}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Card Activities */}
            <Card>
                <CardHeader>
                    <CardTitle>{t.cardsPage.recentActivity}</CardTitle>
                    <CardDescription>{t.cardsPage.latestTransactions}</CardDescription>
                </CardHeader>
                <CardContent>
                    {transactions.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">{t.cardsPage.noTransactions}</p>
                    ) : (
                        <div className="space-y-3">
                            {transactions.slice(0, 8).map(tx => (
                                <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                    <div>
                                        <p className="font-medium text-sm">{tx.note || tx.category}</p>
                                        <p className="text-xs text-muted-foreground">{format(new Date(tx.date), 'dd MMM yyyy')} • {tx.category}</p>
                                    </div>
                                    <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-foreground'}`}>
                                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
