'use client';

import { useEffect, useState, useRef } from 'react';
import { useTransactionStore, AppData } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { User, DollarSign, Save, Trash2, Download, Upload, List } from 'lucide-react';
import { CategoryManager } from '@/components/settings/CategoryManager';

export default function SettingsPage() {
    const { settings, updateSettings, transactions, categories, importData } = useTransactionStore();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [targetSavings, setTargetSavings] = useState('');
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            setName(settings.name);
            setMonthlyIncome(settings.monthlyIncome.toString());
            setTargetSavings(settings.targetSavings.toString());
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

    const handleExport = () => {
        const data: AppData = {
            transactions,
            categories,
            settings,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finsmart-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string) as AppData;
                if (!data.transactions || !data.categories || !data.settings) {
                    throw new Error('Invalid format');
                }

                if (confirm(t.settingsPage.importDescription)) {
                    importData(data);
                    alert(t.settingsPage.importSuccess);
                    window.location.reload(); // Reload to ensure consistent state
                }
            } catch (error) {
                alert(t.settingsPage.importError);
                console.error(error);
            }
        };
        reader.readAsText(file);
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleClearData = () => {
        if (confirm(t.settingsPage.clearConfirm)) {
            localStorage.removeItem('finsmart-storage');
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
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
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4 space-y-1">
                        <p className="text-sm font-medium">{t.settingsPage.calculatedDaily}</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(Math.max(0, (Number(monthlyIncome) - Number(targetSavings)) / 30))}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.settingsPage.dailyFormula}</p>
                    </div>

                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 gap-2 w-full md:w-auto">
                        <Save className="h-4 w-4" />
                        {saved ? t.settingsPage.saved : t.settingsPage.saveChanges}
                    </Button>
                </CardContent>
            </Card>

            {/* Category Management */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-950/50 rounded-lg">
                            <List className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <CardTitle>{t.settingsPage.manageCategories}</CardTitle>
                            <CardDescription>
                                {t.settingsPage.addCategory}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <CategoryManager />
                </CardContent>
            </Card>

            {/* Backup & Restore */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-950/50 rounded-lg">
                            <Download className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                            <CardTitle>{t.settingsPage.backupRestore}</CardTitle>
                            <CardDescription>{t.settingsPage.exportDescription}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" onClick={handleExport} className="gap-2 flex-1">
                            <Download className="h-4 w-4" />
                            {t.settingsPage.exportData}
                        </Button>
                        <div className="flex-1">
                            <input
                                type="file"
                                accept=".json"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImport}
                            />
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2 w-full">
                                <Upload className="h-4 w-4" />
                                {t.settingsPage.importData}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
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
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-medium text-sm">{t.settingsPage.clearAllData}</p>
                            <p className="text-xs text-muted-foreground max-w-sm">
                                {t.settingsPage.clearDescription.replace('{count}', String(transactions.length))}
                            </p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={handleClearData} className="gap-2 w-full sm:w-auto">
                            <Trash2 className="h-4 w-4" />
                            {t.settingsPage.clearButton}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
