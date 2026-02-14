'use client';

import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import { ShoppingBag, Utensils, Zap, Bus, ArrowUpRight, Search } from "lucide-react"; // Import Search
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react'; // Import useEffect for hydration fix
import { format } from 'date-fns';

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'food': return <Utensils className="h-4 w-4" />;
        case 'transport': return <Bus className="h-4 w-4" />;
        case 'utilities': return <Zap className="h-4 w-4" />;
        case 'shopping': case 'groceries': return <ShoppingBag className="h-4 w-4" />;
        case 'freelance': case 'salary': case 'income': return <ArrowUpRight className="h-4 w-4" />;
        default: return <ShoppingBag className="h-4 w-4" />;
    }
};

export default function TransactionsPage() {
    const { transactions } = useTransactionStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredTransactions = transactions.filter(t =>
        t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                    <p className="text-muted-foreground">
                        Manage and view your complete transaction history.
                    </p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>History</CardTitle>
                    <CardDescription>
                        {filteredTransactions.length} transactions found.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredTransactions.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">
                                No transactions found.
                            </div>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
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
                                    <div className={cn("font-bold", transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground')}>
                                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
