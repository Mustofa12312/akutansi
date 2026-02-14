'use client';

import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTransactionStore } from "@/lib/store/useTransactionStore";
import { formatCurrency } from "@/lib/utils";
import { format } from 'date-fns';

export function SmartInsights() {
    const { transactions, settings } = useTransactionStore();

    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');
    const todayStr = format(now, 'yyyy-MM-dd');

    // Calculate real data
    const monthlyExpense = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .reduce((acc, t) => acc + t.amount, 0);

    const spentToday = transactions
        .filter(t => t.date === todayStr && t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const dailyBudget = (settings.monthlyIncome - settings.targetSavings) / 30;
    const dailyUsagePercent = dailyBudget > 0 ? Math.round((spentToday / dailyBudget) * 100) : 0;

    // Top expense category this month
    const categoryMap: Record<string, number> = {};
    transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthStr))
        .forEach(t => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });
    const topCategory = Object.entries(categoryMap).sort(([, a], [, b]) => b - a)[0];

    // Projected savings
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysPassed = Math.max(now.getDate(), 1);
    const projectedExpense = (monthlyExpense / daysPassed) * daysInMonth;
    const projectedSavings = settings.monthlyIncome - projectedExpense;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm opacity-90">Smart Insight</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                            {topCategory
                                ? <>Pengeluaran terbesar bulan ini: <strong>{topCategory[0]}</strong> ({formatCurrency(topCategory[1])}). Coba kurangi dan alokasikan ke tabungan!</>
                                : <>Belum ada pengeluaran bulan ini. Mulai catat transaksi Anda!</>
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm opacity-90">Limit Status</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                            {dailyUsagePercent > 100
                                ? <>⚠️ Hari ini Anda sudah <strong>melebihi batas harian</strong>! Sudah terpakai {dailyUsagePercent}%.</>
                                : dailyUsagePercent > 75
                                    ? <>Hati-hati, sisa batas harian Anda tinggal <strong>{100 - dailyUsagePercent}%</strong> untuk hari ini.</>
                                    : <>✅ Pengeluaran hari ini masih aman. Sisa <strong>{formatCurrency(Math.max(dailyBudget - spentToday, 0))}</strong> dari batas harian.</>
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-none hidden lg:block">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm opacity-90">Savings Projection</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                            {projectedSavings > 0
                                ? <>Anda diproyeksikan bisa menabung <strong>{formatCurrency(projectedSavings)}</strong> bulan ini jika konsisten.</>
                                : <>⚠️ Proyeksi menunjukkan Anda mungkin <strong>tidak mencapai target tabungan</strong> bulan ini.</>
                            }
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
