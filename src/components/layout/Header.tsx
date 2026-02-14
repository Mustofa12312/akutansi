'use client';

import { Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
    const pathname = usePathname();
    const title = pathname === '/' ? 'Dashboard' : pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);

    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
            <div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="text-xs text-muted-foreground hidden sm:block">Welcome back, User</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-card" />
                </button>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm border border-emerald-200">
                    U
                </div>
            </div>
        </header>
    );
}
