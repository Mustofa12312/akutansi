'use client';

import { Bell } from "lucide-react";
import { useTransactionStore } from "@/lib/store/useTransactionStore";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string, nav: Record<string, string>) => {
    switch (pathname) {
        case '/': return nav.dashboard;
        case '/transactions': return nav.transactions;
        case '/budget': return nav.budgetGoals;
        case '/analytics': return nav.analytics;
        case '/cards': return nav.cards;
        case '/settings': return nav.settings;
        default: return nav.dashboard;
    }
};

export function Header() {
    const { settings } = useTransactionStore();
    const { t } = useTranslation();
    const pathname = usePathname();

    const initials = settings.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6">
            <div>
                <h1 className="text-lg font-semibold">{getPageTitle(pathname, t.nav)}</h1>
                <p className="text-xs text-muted-foreground">{t.welcomeBack}, {settings.name}</p>
            </div>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button className="p-2 rounded-xl hover:bg-secondary transition-colors relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    {initials}
                </div>
            </div>
        </header>
    );
}
