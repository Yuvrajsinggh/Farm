import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
        <StyledView className="flex-1 bg-[#9EA199] p-6 justify-center">
            <StyledText className="text-3xl font-bold text-white text-center mb-6">
                {t('forgotPassword')}
            </StyledText>

            <StyledView className="w-full space-y-4">
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
                        <StyledView>
                            <StyledTextInput
                                className="bg-white rounded-lg p-4 text-black"
                                placeholder={t('enterEmail')}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.email && (
                                <StyledText className="text-red-500 text-sm ml-1">
                                    {errors.email.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                />

                <StyledTouchableOpacity
                    className="bg-blue-500 text-white p-4 rounded-lg font-bold mt-4"
                    onPress={handleSubmit(onSubmit)}
                >
                    <StyledText className="text-white text-center">{t('resetPassword')}</StyledText>
                </StyledTouchableOpacity>

                <StyledTouchableOpacity
                    className="text-center mt-4"
                    onPress={() => navigation.navigate('Login')}
                >
                    <StyledText className="text-white">{t('backToLogin')}</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
};

export default ForgotPasswordScreen;
