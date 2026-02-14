import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Locale = 'id' | 'en' | 'ar';

interface LanguageState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            locale: 'id', // Default to Indonesian
            setLocale: (locale) => set({ locale }),
        }),
        {
            name: 'finsmart-language',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
