import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(null);
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            if (savedLanguage) {
                setLanguage(savedLanguage);
                i18n.changeLanguage(savedLanguage);
                setIsLanguageSelected(true);
            }
        };
        loadLanguage();
    }, []);

    // eslint-disable-next-line no-shadow
    const changeLanguage = async (language) => {
        setLanguage(language);
        i18n.changeLanguage(language);
        await AsyncStorage.setItem('language', language);
        setIsLanguageSelected(true);
    };

    return (
        <LanguageContext.Provider value={{ language, isLanguageSelected, changeLanguage, setIsLanguageSelected }}>
            {children}
        </LanguageContext.Provider>
    );
};
