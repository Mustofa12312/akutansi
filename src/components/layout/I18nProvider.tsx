'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/store/useLanguageStore';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const locale = useLanguageStore((state) => state.locale);

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }, [locale]);

    return <>{children}</>;
}
