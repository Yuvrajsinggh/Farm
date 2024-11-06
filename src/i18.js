import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en', // Fallback to English
        lng: 'en', // Default language
        resources: {
            en: { translation: en },
            hi: { translation: hi },
        },
        interpolation: {
            escapeValue: false, // React already handles this
        },
    });

export default i18n;
