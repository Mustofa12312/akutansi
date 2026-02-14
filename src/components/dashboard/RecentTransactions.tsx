'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import { ShoppingBag, Utensils, Zap, Bus, ArrowUpRight } from "lucide-react";

interface Transaction {
    id: string; // Changed from number to string to match store
    category: string;
    amount: number;
    type: string;
    date: string;
    note: string;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'food': return <Utensils className="h-4 w-4" />;
        case 'transport': return <Bus className="h-4 w-4" />;
        case 'utilities': return <Zap className="h-4 w-4" />;
        case 'shopping': case 'groceries': return <ShoppingBag className="h-4 w-4" />;
        case 'freelance': return <ArrowUpRight className="h-4 w-4" />;
        default: return <ShoppingBag className="h-4 w-4" />;
    }
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <Card className="col-span-4 lg:col-span-2"> {/* Adjusted column span */}
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    You made {transactions.length} transactions this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-secondary">
                                {getCategoryIcon(transaction.category)}
                            </div>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{transaction.note || transaction.category}</p>
                                <p className="text-sm text-muted-foreground">{transaction.category}</p>
                            </div>
                            <div className={cn("ml-auto font-medium", transaction.type === 'income' ? 'text-emerald-500' : 'text-foreground')}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
