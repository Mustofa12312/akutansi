'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { Globe } from 'lucide-react';

const languages: { code: Locale; flag: string; label: string }[] = [
    { code: 'id', flag: '🇮🇩', label: 'Indonesia' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'ar', flag: '🇸🇦', label: 'العربية' },
];

export function LanguageSwitcher() {
    const { locale, setLocale } = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const current = languages.find((l) => l.code === locale);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary transition-colors text-sm font-medium"
                aria-label="Change language"
            >
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="hidden sm:inline">{current?.flag}</span>
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLocale(lang.code);
                                setOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary/80 ${locale === lang.code ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground'
                                }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.label}</span>
                            {locale === lang.code && (
                                <span className="ml-auto text-primary">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
