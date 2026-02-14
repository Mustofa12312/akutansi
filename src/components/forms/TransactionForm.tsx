'use client';

import { useState } from 'react';
import { useTransactionStore, TransactionType } from '@/lib/store/useTransactionStore';
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
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogDescription>
                    Record your income or expense to track your budget.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Type</Label>
                        <div className="flex bg-secondary p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === 'expense'
                                        ? 'bg-white shadow text-rose-500'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Expense
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === 'income'
                                        ? 'bg-white shadow text-emerald-500'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Income
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
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
                    <Label htmlFor="amount">Amount (Rp)</Label>
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
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {type === 'expense' ? (
                                <>
                                    <SelectItem value="Food">Food & Dining</SelectItem>
                                    <SelectItem value="Transport">Transportation</SelectItem>
                                    <SelectItem value="Shopping">Shopping</SelectItem>
                                    <SelectItem value="Utilities">Utilities (Bills)</SelectItem>
                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                    <SelectItem value="Health">Health</SelectItem>
                                    <SelectItem value="Others">Others</SelectItem>
                                </>
                            ) : (
                                <>
                                    <SelectItem value="Salary">Monthly Salary</SelectItem>
                                    <SelectItem value="Freelance">Freelance / Proyek</SelectItem>
                                    <SelectItem value="Bonus">Bonus / THR</SelectItem>
                                    <SelectItem value="Investment">Investment Return</SelectItem>
                                    <SelectItem value="Others">Others</SelectItem>
                                </>
                            )}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Input
                        id="note"
                        placeholder="e.g. Lunch at McD"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
            </div>

            <DialogFooter>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Save Transaction
                </Button>
            </DialogFooter>
        </form>
    );
}
