import { useLanguageStore } from '@/lib/store/useLanguageStore';
import type { Locale } from '@/lib/store/useLanguageStore';
import en from './en';
import id from './id';
import ar from './ar';
import type { TranslationKeys } from './en';

const translations: Record<Locale, TranslationKeys> = { en, id, ar };

export function useTranslation() {
    const locale = useLanguageStore((state) => state.locale);
    const setLocale = useLanguageStore((state) => state.setLocale);
    const t = translations[locale];

    return { t, locale, setLocale };
}

export type { TranslationKeys, Locale };
