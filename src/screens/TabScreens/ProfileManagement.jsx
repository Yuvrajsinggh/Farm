import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { styled } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/Authcontext';
import { LanguageContext } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../../i18';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledPicker = styled(Picker);

export default function ProfileManagement() {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    const { changeLanguage } = useContext(LanguageContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setIsLanguageSelected } = useContext(LanguageContext)
    const { t } = useTranslation();
    const [userData, setUserData] = useState({ displayName: '', phoneNumber: '', email: '' });

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            displayName: '',
            phoneNumber: '',
            email: '',
            language: 'dcd',
        },
    });
    const setLanguage = (language) => {
        i18n.changeLanguage(language); // Update language in i18n
        setIsLanguageSelected(true); // Mark language as selected
        ToastAndroid.show(t('languageChanged'), ToastAndroid.SHORT);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem('users');
                const users = storedUsers ? JSON.parse(storedUsers) : [];
                // Assuming the first user is the logged-in user for simplicity
                const user = users[0];
                if (user) {
                    setUserData({
                        displayName: user.name,
                        phoneNumber: user.phone,
                        email: user.email,
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // Retrieve existing user data from AsyncStorage
            const storedUserData = await AsyncStorage.getItem('userData');
            const parsedUserData = storedUserData ? JSON.parse(storedUserData) : {};

            // Merge new data with the existing data
            const updatedUserData = { ...parsedUserData, ...data };

            // Save the updated user data back to AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

            console.log('Profile updated:', updatedUserData);
            ToastAndroid.show(t('profileUpdated'), ToastAndroid.SHORT);

            // Optionally, update local state or context to reflect the changes
            setUserData(updatedUserData); // Assuming `setUserData` is available in your context or component
        } catch (error) {
            console.error(t('errorUpdatingProfile'), error);
            ToastAndroid.show(t('errorUpdatingProfile'), ToastAndroid.SHORT);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignOut = () => {
        logout();
    };


    return (
        <StyledView className="flex-1 bg-[#447055] p-6">
            {/* Header Section */}
            <StyledView className="items-center mb-8 mt-6">
                <Icon name="person-circle-outline" size={80} color="#ffffff" />
                <StyledText className="text-3xl font-bold text-white text-center mt-4">
                    {t('profileManagement')}
                </StyledText>
                <StyledText className="text-white text-lg opacity-80 mt-2">
                    {t('manageAccountDetails')}
                </StyledText>
            </StyledView>

            {/* Profile Form */}
            <StyledView className="w-full space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-lg">
                {/* Display Name Input */}
                <Controller
                    control={control}
                    rules={{ required: t('displayNameRequired') }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledView className="relative">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="person-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={userData.displayName}
                                placeholderTextColor="#ffffff80"
                            />
                            {errors.displayName && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.displayName.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                    name="displayName"
                />

                {/* Phone Number Input */}
                <Controller
                    control={control}
                    rules={{
                        required: t('phoneNumberRequired'),
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: t('invalidPhoneNumber'),
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="call-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={userData.phoneNumber}
                                placeholderTextColor="#ffffff80"
                                keyboardType="phone-pad"
                            />
                            {errors.phoneNumber && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.phoneNumber.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                    name="phoneNumber"
                />

                {/* Email Input */}
                <Controller
                    control={control}
                    rules={{
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('invalidEmailAddress'),
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="mail-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder={userData.email ? userData.email : t('emailOptional')}
                                placeholderTextColor="#ffffff80"
                                keyboardType="email-address"
                            />
                            {errors.email && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.email.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                    name="email"
                />

                {/* Language Picker */}
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="language-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledView className="bg-white/20 rounded-xl overflow-hidden">
                                <StyledPicker
                                    selectedValue={value}
                                    onValueChange={(value) => setLanguage(value)}
                                    dropdownIconColor="#ffffff"
                                    style={{ color: '#ffffff', height: 50, marginLeft: 40 }}
                                >
                                    <Picker.Item label={t('selectLanguage')} />
                                    <Picker.Item label={t('English')} value="en" />
                                    <Picker.Item label={t('Hindi')} value="hi" />
                                </StyledPicker>
                            </StyledView>
                        </StyledView>
                    )}
                    name="language"
                />

                {/* Update Button */}
                <StyledTouchableOpacity
                    className={`bg-white mt-6 p-4 rounded-xl flex-row justify-center items-center space-x-2 ${isSubmitting ? 'opacity-70' : ''}`}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    <Icon name="save-outline" size={24} color="#1e3a8a" />
                    <StyledText className="text-blue-900 font-bold text-lg ml-2">
                        {isSubmitting ? t('updating') : t('updateProfile')}
                    </StyledText>
                </StyledTouchableOpacity>

                {/* Sign Out Button */}
                <StyledTouchableOpacity
                    className="bg-red-500/80 p-4 rounded-xl flex-row justify-center items-center space-x-2 mt-4"
                    onPress={handleSignOut}
                >
                    <Icon name="log-out-outline" size={24} color="#ffffff" />
                    <StyledText className="text-white font-bold text-lg ml-2">
                        {t('signOut')}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
}