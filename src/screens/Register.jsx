import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userRegisterService } from '../../utilities/AuthServices';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
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
            password: '',
        },
    });

    const handleRegister = async (data) => {
        try {
            // Prepare the payload in the required format
            const registerPayload = {
                phone_number: `+${data.phone}`, // Adding '+' prefix as per the required format
                full_name: data.name,
                email: data.email || null, // Email is optional
                password: data.password
            };

            // Call the register service
            const response = await userRegisterService(registerPayload);
            console.log("REGISTER RESPONSE::", response);

            // // Store user data in AsyncStorage
            // await AsyncStorage.setItem('userData', JSON.stringify({
            //     id: response.id,
            //     phone_number: response.phone_number,
            //     full_name: response.full_name,
            //     email: response.email
            // }));

            // Show success message
            // alert('Registration Successful! Please login to continue.');
            // show android toast fro 2 seconds
            ToastAndroid.show('Registration Successful! Please login to continue.', ToastAndroid.SHORT);

            // Navigate to login page
            navigation.navigate('Login');

        } catch (error) {
            console.error('Registration error:', error);

            // Handle specific error cases
            let errorMessage = 'An error occurred during registration. Please try again.';
            if (error.response?.status === 400) {
                errorMessage = 'Invalid data format. Please check your inputs.';
            } else if (error.response?.status === 409) {
                errorMessage = 'Phone number already registered.';
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            }

            alert(errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-[#447055]"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <StyledView className="p-6">
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
                            rules={{
                                required: t('required'),
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters'
                                }
                            }}
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

                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: t('required'),
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <StyledView className="relative mt-4">
                                    <StyledView className="absolute left-3 top-4 z-10">
                                        <Icon name="lock-closed-outline" size={24} color="#ffffff" />
                                    </StyledView>
                                    <StyledTextInput
                                        className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                        placeholder={t('password')}
                                        placeholderTextColor="#ffffff80"
                                        secureTextEntry
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                    {errors.password && (
                                        <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                            {errors.password.message}
                                        </StyledText>
                                    )}
                                </StyledView>
                            )}
                        />

                        {/* Create Account Button */}
                        <StyledTouchableOpacity
                            className="bg-white mt-6 p-4 rounded-xl flex-row justify-center items-center"
                            onPress={handleSubmit(handleRegister)}
                        >
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;