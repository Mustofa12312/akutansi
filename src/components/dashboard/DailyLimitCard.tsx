'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface DailyLimitCardProps {
    limit: number;
    spent: number;
}

export function DailyLimitCard({ limit, spent }: DailyLimitCardProps) {
    const percentage = Math.min((spent / limit) * 100, 100);
    const remaining = Math.max(limit - spent, 0);
    const isOverLimit = spent > limit;
    const isWarning = percentage > 75;

    let progressColor = "bg-emerald-500";
    let statusColor = "text-emerald-500";
    let statusIcon = <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    let statusText = "You are in the safe zone";

    if (isOverLimit) {
        progressColor = "bg-rose-500";
        statusColor = "text-rose-500";
        statusIcon = <AlertCircle className="h-5 w-5 text-rose-500" />;
        statusText = "You've exceeded today's limit";
    } else if (isWarning) {
        progressColor = "bg-amber-500";
        statusColor = "text-amber-500";
        statusIcon = <AlertCircle className="h-5 w-5 text-amber-500" />;
        statusText = "Careful, you're near the limit";
    }

    return (
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">Daily Spending Limit</CardTitle>
                        <CardDescription>Your daily financial guard rails</CardDescription>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full bg-secondary flex items-center gap-2 text-sm font-medium", statusColor)}>
                        {statusIcon}
                        {statusText}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-muted-foreground">Spent Today</span>
                        <span>{formatCurrency(spent)}</span>
                    </div>
                    <Progress
                        value={percentage}
                        className="h-3"
                        indicatorClassName={progressColor}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Remaining</p>
                        <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(remaining)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Daily Limit</p>
                        <p className="text-xl font-bold mt-1">{formatCurrency(limit)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Usage</p>
                        <p className={cn("text-xl font-bold mt-1", statusColor)}>{Math.round(percentage)}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
