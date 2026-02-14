'use client';

import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, cn } from "@/lib/utils";
import { ShoppingBag, Utensils, Zap, Bus, ArrowUpRight, Search, Trash2, Plus, Gift, Briefcase, Heart, Film, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { FloatingAddButton } from "@/components/layout/FloatingAddButton";

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'food': return <Utensils className="h-4 w-4" />;
        case 'transport': return <Bus className="h-4 w-4" />;
        case 'utilities': return <Zap className="h-4 w-4" />;
        case 'shopping': case 'groceries': return <ShoppingBag className="h-4 w-4" />;
        case 'freelance': case 'salary': return <Briefcase className="h-4 w-4" />;
        case 'bonus': return <Gift className="h-4 w-4" />;
        case 'health': return <Heart className="h-4 w-4" />;
        case 'entertainment': return <Film className="h-4 w-4" />;
        case 'investment': return <ArrowUpRight className="h-4 w-4" />;
        default: return <MoreHorizontal className="h-4 w-4" />;
    }
};

export default function TransactionsPage() {
    const { transactions, deleteTransaction } = useTransactionStore();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
    const [mounted, setMounted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || tx.type === filterType;
        return matchesSearch && matchesType;
    });

    const totalFiltered = filteredTransactions.reduce((acc, tx) =>
        tx.type === 'income' ? acc + tx.amount : acc - tx.amount, 0
    );

    const filterLabels: Record<string, string> = {
        all: t.transactionsPage.all,
        income: t.form.incomeType,
        expense: t.form.expense,
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t.transactionsPage.title}</h2>
                    <p className="text-muted-foreground">
                        {t.transactionsPage.subtitle}
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                            <Plus className="h-4 w-4" />
                            {t.form.addTransaction}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <TransactionForm onSuccess={() => setDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t.transactionsPage.searchPlaceholder}
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-secondary p-1 rounded-lg">
                    {(['all', 'income', 'expense'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={cn(
                                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                filterType === type
                                    ? "bg-white shadow text-foreground dark:bg-slate-800"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {filterLabels[type]}
                        </button>
                    ))}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{t.transactionsPage.history}</CardTitle>
                            <CardDescription>
                                {t.transactionsPage.transactionsFound.replace('{count}', String(filteredTransactions.length))}
                            </CardDescription>
                        </div>
                        <div className={cn("text-lg font-bold", totalFiltered >= 0 ? "text-emerald-600" : "text-rose-500")}>
                            {totalFiltered >= 0 ? '+' : ''}{formatCurrency(totalFiltered)}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {filteredTransactions.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-30" />
                                <p>{t.transactionsPage.noTransactions}</p>
                                <p className="text-xs mt-1">{t.transactionsPage.tryAdjusting}</p>
                            </div>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full border",
                                            transaction.type === 'income' ? "bg-emerald-100 border-emerald-200 text-emerald-700" : "bg-secondary border-border"
                                        )}>
                                            {getCategoryIcon(transaction.category)}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium leading-none">{transaction.note || transaction.category}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{transaction.category}</span>
                                                <span>•</span>
                                                <span>{format(new Date(transaction.date), 'dd MMM yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={cn("font-bold", transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground')}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </div>
                                        <button
                                            onClick={() => deleteTransaction(transaction.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-100 dark:hover:bg-rose-950 rounded-md transition-all text-rose-500"
                                            title={t.transactionsPage.deleteTransaction}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <FloatingAddButton />
        </div>
    );
}
