'use client';

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/forms/TransactionForm";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";

export function FloatingAddButton() {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus className="h-8 w-8" />
                        <span className="sr-only">{t.form.addTransaction}</span>
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <TransactionForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
