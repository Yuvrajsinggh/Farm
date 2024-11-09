import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../i18';



const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LanguageSelection = () => {
    const { t } = useTranslation();
    const { setIsLanguageSelected } = useContext(LanguageContext);

    const setLanguage = (language) => {
        i18n.changeLanguage(language);
        setIsLanguageSelected(true);
    };

    const languages = [
        { code: 'en', name: 'English', icon: '🇬🇧', description: 'English (United Kingdom)' },
        { code: 'hi', name: 'हिंदी', icon: '🇮🇳', description: 'Hindi (India)' }
    ];

    return (
        <StyledView className="flex-1 bg-[#447055] p-6">
            {/* Header Section */}
            <StyledView className="items-center mb-12 mt-10">
                <Icon name="language-outline" size={80} color="#ffffff" />
                <StyledText className="text-4xl font-bold text-white text-center mt-4">
                    {t('selectLanguage')}
                </StyledText>
                <StyledText className="text-white text-lg opacity-80 mt-2">
                    Choose your preferred language
                </StyledText>
            </StyledView>

            {/* Language Options */}
            <StyledView className="space-y-4">
                {languages.map((lang) => (
                    <StyledTouchableOpacity
                        key={lang.code}
                        className="bg-white/10 p-6 rounded-xl backdrop-blur-lg active:bg-white/20"
                        onPress={() => setLanguage(lang.code)}
                    >
                        <StyledView className="flex-row items-center">
                            <StyledText className="text-4xl mr-4">{lang.icon}</StyledText>
                            <StyledView className="flex-1">
                                <StyledText className="text-white text-xl font-bold">
                                    {lang.name}
                                </StyledText>
                                <StyledText className="text-white/70">
                                    {lang.description}
                                </StyledText>
                            </StyledView>
                            <Icon name="chevron-forward-outline" size={24} color="#ffffff" />
                        </StyledView>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>

            {/* Info Section */}
            <StyledView className="mt-auto bg-white/10 p-4 rounded-xl">
                <StyledView className="flex-row items-center mb-2">
                    <Icon name="information-circle-outline" size={24} color="#ffffff" />
                    <StyledText className="text-white font-bold text-lg ml-2">
                        Language Preference
                    </StyledText>
                </StyledView>
                <StyledText className="text-white/70">
                    You can change your language preference later in the profile settings.
                </StyledText>
            </StyledView>

            {/* Additional Languages Notice */}
            <StyledView className="mt-4 items-center">
                <StyledText className="text-white/50 text-center">
                    More languages coming soon...
                </StyledText>
            </StyledView>
        </StyledView>
    );
};

export default LanguageSelection;