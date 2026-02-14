'use client';

import { ArrowDownRight, ArrowUpRight, Wallet, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

interface SummarySectionProps {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    savingsTarget: number;
}

export function SummaryCards({ totalIncome, totalExpense, balance, savingsTarget }: SummarySectionProps) {
    const { t } = useTranslation();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.dashboard.totalBalance}</CardTitle>
                    <Wallet className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
                    <p className="text-xs text-muted-foreground">
                        {t.dashboard.availableFunds}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.dashboard.income}</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                    <p className="text-xs text-emerald-500">
                        +12% {t.dashboard.fromLastMonth}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.dashboard.expenses}</CardTitle>
                    <ArrowDownRight className="h-4 w-4 text-rose-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalExpense)}</div>
                    <p className="text-xs text-rose-500">
                        +4% {t.dashboard.fromLastMonth}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t.dashboard.savingsGoal}</CardTitle>
                    <PiggyBank className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(savingsTarget)}</div>
                    <p className="text-xs text-muted-foreground">
                        {t.dashboard.monthlyTarget}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
