'use client';

import { useState } from 'react';
import { useTransactionStore, TransactionType } from '@/lib/store/useTransactionStore';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function CategoryManager() {
    // Access store
    const categories = useTransactionStore((state) => state.categories);
    const addCategory = useTransactionStore((state) => state.addCategory);
    const deleteCategory = useTransactionStore((state) => state.deleteCategory);
    const { t } = useTranslation();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryType, setNewCategoryType] = useState<TransactionType>('expense');

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;

        addCategory({
            name: newCategoryName.trim(),
            type: newCategoryType,
            isDefault: false,
        });

        setNewCategoryName('');
    };

    const handleDeleteCategory = (id: string) => {
        if (confirm(t.settingsPage.deleteCategoryConfirm)) {
            deleteCategory(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                    <Label>{t.settingsPage.categoryName}</Label>
                    <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g. Netflix, Gym"
                    />
                </div>
                <div className="w-full md:w-40 space-y-2">
                    <Label>{t.settingsPage.categoryType}</Label>
                    <Select
                        value={newCategoryType}
                        onValueChange={(val) => setNewCategoryType(val as TransactionType)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="expense">{t.form.expense}</SelectItem>
                            <SelectItem value="income">{t.form.incomeType}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleAddCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t.settingsPage.addCategory}
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-card text-card-foreground shadow-sm"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${category.type === 'expense' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                            <span className="font-medium truncate" title={category.name}>{category.name}</span>
                        </div>
                        {!category.isDefault && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteCategory(category.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
