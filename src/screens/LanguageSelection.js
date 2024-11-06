import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import i18n from '../i18';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';

const LanguageSelection = () => {
    const { t } = useTranslation();
    const { setIsLanguageSelected } = useContext(LanguageContext);

    const setLanguage = (language) => {
        i18n.changeLanguage(language); // Update language in i18n
        setIsLanguageSelected(true); // Mark language as selected
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{t('selectLanguage')}</Text>
            <Button title="English" onPress={() => setLanguage('en')} />
            <Button title="हिंदी" onPress={() => setLanguage('hi')} />
        </View>
    );
};

export default LanguageSelection;
