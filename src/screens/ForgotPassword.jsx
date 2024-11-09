import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ForgotPasswordScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '' },
    });

    const onSubmit = (data) => {
        console.log('Reset email sent to:', data.email);
        // Implement password reset logic here
    };

    return (
        <StyledView className="flex-1 bg-[#447055] p-6">
            {/* Header Section */}
            <StyledView className="items-center mb-12 mt-10">
                <StyledView className="bg-white/20 p-6 rounded-full mb-6">
                    <Icon name="lock-open-outline" size={60} color="#ffffff" />
                </StyledView>
                <StyledText className="text-4xl font-bold text-white text-center">
                    {t('forgotPassword')}
                </StyledText>
                <StyledText className="text-white text-lg opacity-80 mt-2 text-center px-6">
                    Enter your email address to receive password reset instructions
                </StyledText>
            </StyledView>

            {/* Form Section */}
            <StyledView className="w-full space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-lg">
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: t('required'),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('invalidEmail'),
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StyledView className="relative">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="mail-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                placeholder={t('enterEmail')}
                                placeholderTextColor="#ffffff80"
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.email && (
                                <StyledView className="flex-row items-center mt-2">
                                    <Icon name="alert-circle-outline" size={16} color="#FCA5A5" />
                                    <StyledText className="text-red-300 text-sm ml-1">
                                        {errors.email.message}
                                    </StyledText>
                                </StyledView>
                            )}
                        </StyledView>
                    )}
                />

                {/* Reset Button */}
                <StyledTouchableOpacity
                    className="bg-white mt-6 p-4 rounded-xl flex-row justify-center items-center"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Icon name="send-outline" size={24} color="#447055" />
                    <StyledText className="text-[#447055] font-bold text-lg ml-2">
                        Send Reset Link
                    </StyledText>
                </StyledTouchableOpacity>

                {/* Back to Login */}
                <StyledTouchableOpacity
                    className="flex-row justify-center items-center mt-4"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Icon name="arrow-back-outline" size={20} color="#ffffff" />
                    <StyledText className="text-white text-lg ml-2">
                        Back to Login
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>

            {/* Help Section */}
            <StyledView className="mt-auto">
                <StyledView className="bg-white/10 p-4 rounded-xl">
                    <StyledView className="flex-row items-center mb-2">
                        <Icon name="help-circle-outline" size={24} color="#ffffff" />
                        <StyledText className="text-white font-bold text-lg ml-2">
                            Need Help?
                        </StyledText>
                    </StyledView>
                    <StyledText className="text-white/70">
                        If you're having trouble resetting your password, please contact our support team.
                    </StyledText>
                </StyledView>

                {/* Contact Support Button */}
                <StyledTouchableOpacity
                    className="flex-row justify-center items-center mt-4"
                    onPress={() => {/* Implement contact support */ }}
                >
                    {/* <Icon name="chatbubble-ellipses-outline" size={20} color="#ffffff" /> */}
                    {/* <StyledText className="text-white text-base ml-2">
                        Contact Support
                    </StyledText> */}
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
};

export default ForgotPasswordScreen;