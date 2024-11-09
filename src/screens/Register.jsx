import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const RegisterScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            email: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        // Handle registration logic here
        navigation.navigate('Login');
        // ToastAndroid.show(t('accountCreatedSuccessfully'), ToastAndroid.SHORT);
    };

    return (
        <StyledView className="flex-1 bg-[#447055] p-6">
            {/* Header Section */}
            <StyledView className="items-center mb-8 mt-6">
                <Icon name="person-add-outline" size={80} color="#ffffff" />
                <StyledText className="text-4xl font-bold text-white text-center mt-4">
                    {t('register')}
                </StyledText>
                <StyledText className="text-white text-lg opacity-80 mt-2">
                    {t('joinCommunity')}
                </StyledText>
            </StyledView>

            {/* Registration Form */}
            <StyledView className="w-full space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-lg">
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: t('required') }}
                    render={({ field: { onChange, value } }) => (
                        <StyledView className="relative">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="person-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                placeholder={t('fullName')}
                                placeholderTextColor="#ffffff80"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.name && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.name.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                />

                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: t('required'),
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: t('invalidPhone'),
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="call-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                placeholder={t('phoneNumber')}
                                placeholderTextColor="#ffffff80"
                                keyboardType="phone-pad"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.phone && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.phone.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('invalidEmail'),
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="mail-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                placeholder={t('emailOptional')}
                                placeholderTextColor="#ffffff80"
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.email && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.email.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                />

                {/* Create Account Button */}
                <StyledTouchableOpacity
                    className="bg-white mt-6 p-4 rounded-xl flex-row justify-center items-center"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Icon name="fitness-outline" size={24} color="#447055" />
                    <StyledText className="text-[#447055] font-bold text-lg ml-2">
                        {t('createAccount')}
                    </StyledText>
                </StyledTouchableOpacity>

                {/* Login Link */}
                <StyledTouchableOpacity
                    className="flex-row justify-center items-center mt-4"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Icon name="log-in-outline" size={20} color="#ffffff" />
                    <StyledText className="text-white text-lg ml-2">
                        {t('alreadyHaveAccount')}
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
};

export default RegisterScreen;