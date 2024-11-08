import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/Authcontext';
import { LanguageContext } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
export default function ProfileManagement() {
    const navigation = useNavigation();
    const { signOut } = useContext(AuthContext);
    const { changeLanguage } = useContext(LanguageContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();
    const { logout } = React.useContext(AuthContext);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            displayName: '',
            phoneNumber: '',
            email: '',
            language: 'en',
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Implement your API call to update user profile here
            console.log('Profile updated:', data);
            ToastAndroid.show('Profile Updated Successfully!', ToastAndroid.SHORT);
            // Update language if changed
            await changeLanguage(data.language);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignOut = () => {
        logout();
    };

    return (
        <View className="flex-1 bg-[#9EA199] p-4">
            <Text className="text-2xl font-bold mb-6">{t('Profile Management')}</Text>
            {/* <FontAwesomeIcon icon={faMugSaucer} /> */}
            <Controller
                control={control}
                rules={{ required: t('Display name is required') }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center mb-4">
                        <Icon name="user" size={20} color="white" className="mr-2" />
                        <TextInput
                            className="bg-black p-2 rounded-lg flex-1"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={t('Display Name')}
                        />
                    </View>
                )}
                name="displayName"
            />
            {errors.displayName && <Text className="text-red-500 mb-2">{errors.displayName.message}</Text>}

            <Controller
                control={control}
                rules={{
                    required: t('Phone number is required'),
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: t('Invalid phone number'),
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center mb-4">
                        <Icon name="phone" size={20} color="black" className="mr-2" />
                        <TextInput
                            className="bg-black p-2 rounded-lg flex-1"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={t('Phone Number')}
                            keyboardType="phone-pad"
                        />
                    </View>
                )}
                name="phoneNumber"
            />
            {errors.phoneNumber && <Text className="text-red-500 mb-2">{errors.phoneNumber.message}</Text>}

            <Controller
                control={control}
                rules={{
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('Invalid email address'),
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-row items-center mb-4">
                        <Icon name="envelope" size={20} color="black" className="mr-2" />
                        <TextInput
                            className="bg-black p-2 rounded-lg flex-1"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={t('Email (optional)')}
                            keyboardType="email-address"
                        />
                    </View>
                )}
                name="email"
            />
            {errors.email && <Text className="text-red-500 mb-2">{errors.email.message}</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <View className="bg-black rounded-lg mb-4">
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            <Picker.Item label={t('English')} value="en" />
                            <Picker.Item label={t('Hindi')} value="hi" />
                            {/* Add more language options as needed */}
                        </Picker>
                    </View>
                )}
                name="language"
            />

            <TouchableOpacity
                className={`bg-blue-500 p-3 rounded-lg ${isSubmitting ? 'opacity-50' : ''}`}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                <Text className="text-white text-center font-bold">
                    {isSubmitting ? t('Updating...') : t('Update Profile')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-red-500 p-3 rounded-lg mt-4"
                onPress={handleSignOut}
            >
                <Text className="text-white text-center font-bold">{t('Sign Out')}</Text>
            </TouchableOpacity>
        </View>
    );
}
