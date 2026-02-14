'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { User, DollarSign, Save, Trash2 } from 'lucide-react';

export default function SettingsPage() {
    const { settings, updateSettings, transactions } = useTransactionStore();
    const { t } = useTranslation();
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
        if (confirm(t.settingsPage.clearConfirm)) {
            localStorage.removeItem('finsmart-storage');
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t.settingsPage.title}</h2>
                <p className="text-muted-foreground">{t.settingsPage.subtitle}</p>
            </div>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                            <User className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle>{t.settingsPage.profile}</CardTitle>
                            <CardDescription>{t.settingsPage.personalInfo}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t.settingsPage.displayName}</Label>
                        <Input
                            id="name"
                            placeholder={t.settingsPage.namePlaceholder}
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
                            <CardTitle>{t.settingsPage.financialSettings}</CardTitle>
                            <CardDescription>{t.settingsPage.configureIncome}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="income">{t.settingsPage.monthlyIncome}</Label>
                        <Input
                            id="income"
                            type="number"
                            placeholder="15000000"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            {t.settingsPage.currentValue.replace('{value}', formatCurrency(settings.monthlyIncome))}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="savings">{t.settingsPage.savingsTarget}</Label>
                        <Input
                            id="savings"
                            type="number"
                            placeholder="5000000"
                            value={targetSavings}
                            onChange={(e) => setTargetSavings(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            {t.settingsPage.currentValue.replace('{value}', formatCurrency(settings.targetSavings))}
                        </p>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4 space-y-1">
                        <p className="text-sm font-medium">{t.settingsPage.calculatedDaily}</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(Math.max(0, (Number(monthlyIncome) - Number(targetSavings)) / 30))}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.settingsPage.dailyFormula}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex gap-4">
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                    <Save className="h-4 w-4" />
                    {saved ? t.settingsPage.saved : t.settingsPage.saveChanges}
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
                            <CardTitle>{t.settingsPage.dangerZone}</CardTitle>
                            <CardDescription>{t.settingsPage.dataManagement}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm">{t.settingsPage.clearAllData}</p>
                            <p className="text-xs text-muted-foreground">
                                {t.settingsPage.clearDescription.replace('{count}', String(transactions.length))}
                            </p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={handleClearData} className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            {t.settingsPage.clearButton}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
