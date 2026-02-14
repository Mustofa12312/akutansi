'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { User, DollarSign, Save, Trash2 } from 'lucide-react';

export default function SettingsPage() {
    const { settings, updateSettings, transactions } = useTransactionStore();
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [targetSavings, setTargetSavings] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            /* eslint-disable react-hooks/set-state-in-effect */
            setName(settings.name);
            setMonthlyIncome(settings.monthlyIncome.toString());
            setTargetSavings(settings.targetSavings.toString());
            /* eslint-enable react-hooks/set-state-in-effect */
        }
    }, [mounted, settings]);

    if (!mounted) return null;

    const handleSave = () => {
        updateSettings({
            name: name || 'User',
            monthlyIncome: Number(monthlyIncome) || 0,
            targetSavings: Number(targetSavings) || 0,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleClearData = () => {
        if (confirm('Are you sure you want to clear all transaction data? This cannot be undone.')) {
            localStorage.removeItem('finsmart-storage');
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Configure your profile and financial settings.
                </p>
            </div>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                            <User className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Your personal information</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                            id="name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Financial Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                            <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle>Financial Settings</CardTitle>
                            <CardDescription>Configure your income and budget parameters</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="income">Monthly Income (Rp)</Label>
                        <Input
                            id="income"
                            type="number"
                            placeholder="15000000"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Current: {formatCurrency(settings.monthlyIncome)}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="savings">Monthly Savings Target (Rp)</Label>
                        <Input
                            id="savings"
                            type="number"
                            placeholder="5000000"
                            value={targetSavings}
                            onChange={(e) => setTargetSavings(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Current: {formatCurrency(settings.targetSavings)}
                        </p>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4 space-y-1">
                        <p className="text-sm font-medium">Calculated Daily Limit</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(Math.max(0, (Number(monthlyIncome) - Number(targetSavings)) / 30))}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            = (Monthly Income − Savings Target) ÷ 30 days
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex gap-4">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                    <Save className="h-4 w-4" />
                    {saved ? 'Saved ✓' : 'Save Changes'}
                </Button>
            </div>

            {/* Data Management */}
            <Card className="border-rose-200 dark:border-rose-900">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-100 dark:bg-rose-950/50 rounded-lg">
                            <Trash2 className="h-5 w-5 text-rose-600" />
                        </div>
                        <div>
                            <CardTitle>Danger Zone</CardTitle>
                            <CardDescription>Data management actions</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">Clear All Data</p>
                            <p className="text-xs text-muted-foreground">
                                Remove all {transactions.length} transactions and reset settings.
                            </p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={handleClearData} className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Clear Data
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
