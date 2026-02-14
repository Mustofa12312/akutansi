'use client';

import { useState } from 'react';
import { useTransactionStore, TransactionType } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface TransactionFormProps {
    onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const { t } = useTranslation();

    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !category) return;

        addTransaction({
            type,
            amount: Number(amount),
            category,
            date,
            note,
        });

        // Reset form
        setAmount('');
        setCategory('');
        setNote('');
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
                <DialogTitle>{t.form.addTransaction}</DialogTitle>
                <DialogDescription>
                    {t.form.recordTransaction}
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>{t.form.type}</Label>
                        <div className="flex bg-secondary p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === 'expense'
                                    ? 'bg-white shadow text-rose-500'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {t.form.expense}
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === 'income'
                                    ? 'bg-white shadow text-emerald-500'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {t.form.incomeType}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">{t.form.date}</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="amount">{t.form.amount}</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-lg font-semibold"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">{t.form.category}</Label>
                    <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                            <SelectValue placeholder={t.form.selectCategory} />
                        </SelectTrigger>
                        <SelectContent>
                            {type === 'expense' ? (
                                <>
                                    <SelectItem value="Food">{t.categories.foodDining}</SelectItem>
                                    <SelectItem value="Transport">{t.categories.transportation}</SelectItem>
                                    <SelectItem value="Shopping">{t.categories.shopping}</SelectItem>
                                    <SelectItem value="Utilities">{t.categories.utilities}</SelectItem>
                                    <SelectItem value="Entertainment">{t.categories.entertainment}</SelectItem>
                                    <SelectItem value="Health">{t.categories.health}</SelectItem>
                                    <SelectItem value="Others">{t.categories.others}</SelectItem>
                                </>
                            ) : (
                                <>
                                    <SelectItem value="Salary">{t.categories.monthlySalary}</SelectItem>
                                    <SelectItem value="Freelance">{t.categories.freelance}</SelectItem>
                                    <SelectItem value="Bonus">{t.categories.bonus}</SelectItem>
                                    <SelectItem value="Investment">{t.categories.investmentReturn}</SelectItem>
                                    <SelectItem value="Others">{t.categories.others}</SelectItem>
                                </>
                            )}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="note">{t.form.note}</Label>
                    <Input
                        id="note"
                        placeholder={t.form.notePlaceholder}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
            </div>

            <DialogFooter>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {t.form.save}
                </Button>
            </DialogFooter>
        </form>
    );
}
